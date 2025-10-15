import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Upload,
  ChefHat,
  Type,
  Save,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import {  deleteCategory } from "@/api/category";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useParams, useNavigate } from "react-router-dom";
import { removeCategory } from "@/store/features/category";
import { ImageUploadWithCrop } from "../../common/ImageUploadWithCrop";
import { fetchCategoryById, updateCategory } from "@/api/category";

// Interfaces
export interface CategoryFormData {
  name: string;
  imageFile: File | null;
  imageUrl: string | null;
}

export const CategoryDetails: React.FC = () => {
  const categoryId = useParams().id?.toString() || "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const category = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    imageFile: null,
    imageUrl: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch product
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
    }
  }, [dispatch, categoryId]);

  // Fill form
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        imageFile: null,
        imageUrl: category.image?.url || null,
      });
    }
  }, [category]);

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
      toast.error("Please upload an image for the category.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    try {
      await dispatch(updateCategory(category!._id, formDataToSend));
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
      const res = await dispatch(deleteCategory(category!._id));
      if (res) {
        dispatch(removeCategory(category!._id));
        navigate("/dashboard/category");
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
            Edit or remove this category from your menu
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
                Category Image
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
                Category Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter food category name..."
                required
                maxLength={25}
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
              <div className="text-right text-xs text-gray-400">
                {formData.name.length} / 25 characters
              </div>
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
              <h2 className="text-xl font-bold mb-2 text-center text-red-600">Delete Category</h2>
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