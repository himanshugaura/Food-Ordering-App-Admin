import React, { useState } from "react";
import {
  Plus,
  Upload,
  ChefHat,
  Type,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import { uploadCategory } from "@/api/category";
import { ImageUploadWithCrop } from "../../common/ImageUploadWithCrop";

export interface CategoryFormData {
  name: string;
  imageFile: File | null;
  imageUrl: string | null;
}

export const AddCategory: React.FC = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    imageFile: null,
    imageUrl: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrl: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.imageFile) {
      toast.error("Please upload an image for the category.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.imageFile);

    try {
      const res = await dispatch(uploadCategory(formDataToSend));
      if (res) {
        setFormData({
          name: "",
          imageFile: null,
          imageUrl: null,
        });
      } else {
        toast.error("Upload Failed");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    } finally {
      setIsSubmitting(false);
    }
    // Handle form submission here
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Add New Category
          </h1>
          <p className="text-gray-400">
            Create a mouth-watering addition to your menu
          </p>
        </div>

        {/* Form Card */}
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
            {/* Name Field */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Category...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add to Menu
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};