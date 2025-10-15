import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Upload,
  ChefHat,
  Type,
  AlignLeft,
  IndianRupee,
  Save,
} from "lucide-react";
import { CategorySelector } from "./CategorySelector";
import { FoodTypeSelector } from "./FoodTypeSelector";
import { ImageUploadWithCrop } from "../../common/ImageUploadWithCrop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FoodType } from "@/constants/typeConstants";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import { fetchProductById, updateProduct, deleteProduct } from "@/api/product";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useParams, useNavigate } from "react-router-dom";
import { removeProduct } from "@/store/features/product.slice";

// Interfaces
export interface ProductFormData {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  foodType: FoodType;
  imageFile: File | null;
  imageUrl: string | null;
}

export const ProductDetails: React.FC = () => {
  const productId = useParams().id?.toString() || "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    categoryId: "",
    price: 0,
    foodType: FoodType.VEG,
    imageFile: null,
    imageUrl: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch product
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  // Fill form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        categoryId: product.category?._id || "",
        price: product.price || 0,
        foodType: product.foodType || FoodType.VEG,
        imageFile: null,
        imageUrl: product.image?.url || null,
      });
    }
  }, [product]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, categoryId }));
  };

  const handleFoodTypeChange = (foodType: FoodType) => {
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, foodType }));
  };

  // Updated: imageFile + preview URL
  const handleImageChange = (file: File | null) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrl: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.imageFile && !formData.imageUrl) {
      toast.error("Please upload an image for the dish.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.categoryId);
    formDataToSend.append("foodType", formData.foodType);
    formDataToSend.append("price", formData.price.toString());

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    try {
      await dispatch(updateProduct(product!._id, formDataToSend));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show modal instead of window.confirm
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      setIsSubmitting(true);
      const res = await dispatch(deleteProduct(product!._id));
      if (res) {
        dispatch(removeProduct(product!._id));
        navigate("/dashboard/products");
      }
    } catch (error) {
      toast.error("Error deleting product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Product Details
          </h1>
          <p className="text-gray-400">
            Edit or remove this dish from your menu
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mb-4 animate-in fade-in slide-in-from-right duration-700">
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-black"
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 text-black"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={openDeleteModal}
            className="flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Food Image
              </label>
              <ImageUploadWithCrop
                imageFile={formData.imageFile}
                imageUrl={formData.imageUrl}
                onImageChange={handleImageChange}
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Dish Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter delicious dish name..."
                required
                maxLength={25}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
              <div className="text-right text-xs text-gray-400">
                {formData.name.length} / 25 characters
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <AlignLeft className="w-4 h-4" />
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the flavors, ingredients, and what makes this dish special..."
                rows={4}
                required
                maxLength={90}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300 resize-none"
              />
              <div className="text-right text-xs text-gray-400">
                {formData.description.length} / 90 characters
              </div>
            </div>

            {/* Category & Food Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Category
                </label>
                <CategorySelector
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Food Type
                </label>
                <FoodTypeSelector
                  value={formData.foodType}
                  onChange={handleFoodTypeChange}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Price
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="1"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Submit */}
            {isEditing && (
              <Button type="submit"
                disabled={isSubmitting}
                className="w-full">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </div>
                )}
              </Button>
            )}
          </form>
        </div>

        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-60 text-black">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-2 text-center text-red-600">Delete Product</h2>
              <p className="mb-6 text-center">
                Are you sure you want to delete <span className="font-semibold">{formData.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={closeDeleteModal}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deleting..." : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};