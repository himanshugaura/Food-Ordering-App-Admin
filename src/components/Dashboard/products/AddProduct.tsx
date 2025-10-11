
import React, { useState, useRef } from 'react';
import { Plus, Upload, ChefHat, DollarSign, Type, AlignLeft } from 'lucide-react';
import { CategorySelector } from './CategorySelector';
import { FoodTypeSelector } from './FoodTypeSelector';
import { ImageUploadWithCrop } from './ImageUploadWithCrop';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FoodType } from '@/constants/typeConstants';


export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  foodType: FoodType;
  image: string | null;
}

export const AddFoodProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    price: '',
    foodType: FoodType.VEG,
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
    }));
  };

  const handleFoodTypeChange = (foodType: FoodType) => {
    setFormData(prev => ({
      ...prev,
      foodType,
    }));
  };

  const handleImageChange = (image: string | null) => {
    setFormData(prev => ({
      ...prev,
      image,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Product Data:', formData);
    setIsSubmitting(false);
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
            Add New Dish
          </h1>
          <p className="text-gray-400">Create a mouth-watering addition to your menu</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Food Image
              </label>
              <ImageUploadWithCrop
                image={formData.image}
                onImageChange={handleImageChange}
              />
            </div>

            {/* Name Field */}
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
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Description Field */}
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
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Category and Food Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Category
                </label>
                <CategorySelector
                  value={formData.category}
                  onChange={handleCategoryChange}
                />
              </div>

              {/* Food Type */}
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

            {/* Price Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
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
                  Adding Dish...
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