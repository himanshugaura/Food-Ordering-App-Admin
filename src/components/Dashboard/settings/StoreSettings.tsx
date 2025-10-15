import React, { useEffect, useState } from "react";
import { Pencil, Upload, Type, AlignLeft, Save, RotateCcw, Hash } from "lucide-react";
import { ImageUploadWithCrop } from "../../common/ImageUploadWithCrop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { fetchStore, updateStore } from "@/api/store";
import { resetOrderCounter, toggleStoreStatus } from "@/api/store";

// Interfaces

export interface StoreFormData {
  name: string;
  address: string;
  imageFile: File | null;
  imageUrl: string | null;
}

export const StoreSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const store = useSelector((state: RootState) => state.store.store);

  const [formData, setFormData] = useState<StoreFormData>({
    name: "",
    address: "",
    imageFile: null,
    imageUrl: null,
  });  
  const [isStoreOpen, setIsStoreOpen] = useState(store?.isOpen);
  const [orderCounter, setOrderCounter] = useState(store?.orderCounter);

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!store) {
        try {
          await dispatch(fetchStore());
        } catch (error) {
          console.error("Error fetching store:", error);
          toast.error("Something went wrong");
        }
      }
    };
    fetchData();
  }, [store, dispatch]);

  // Fill form
  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name,
        address: store.address,
        imageFile: null,
        imageUrl: store.logo.url,
      });
      setIsStoreOpen(store.isOpen);
      setOrderCounter(store.orderCounter);
    }
  }, [store]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImageChange = (file: File | null) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrl: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleToggleStore = async () => {
    const newStatus = !isStoreOpen;
    setIsStoreOpen(newStatus);
    try {
      await dispatch(toggleStoreStatus());
    } catch (error) {
      console.error("Error toggling store status:", error);
      toast.error("Something went wrong");
    }
  };

  const handleResetCounter = async () => {
    setOrderCounter(0);
    try {
        await dispatch(resetOrderCounter());
    } catch (error) {
        console.error("Error resetting order counter:", error);
        toast.error("Something went wrong");
    }
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
    formDataToSend.append("address", formData.address);

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    try {
      await dispatch(updateStore(formDataToSend));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 w-full">
      <div className="max-w-2xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Store Details
          </h1>
        </div>

        {/* Store Controls - Outside Form */}
        <div className="mb-6 space-y-4 animate-in fade-in slide-in-from-left duration-700">
          {/* Store Toggle */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isStoreOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Store Status</h3>
                  <p className="text-sm text-gray-400">
                    Store is currently {isStoreOpen ? 'accepting' : 'not accepting'} orders
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleStore}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  isStoreOpen ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                    isStoreOpen ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Order Counter */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Hash className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Order Counter</h3>
                  <p className="text-2xl font-bold text-purple-400">{orderCounter}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleResetCounter}
                className="flex items-center gap-2 text-red-400 border-red-400/50 hover:bg-red-400/10 hover:text-red-300"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
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
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Logo
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
                Store Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter store name..."
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <AlignLeft className="w-4 h-4" />
                Address
              </label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Describe the store location..."
                rows={4}
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            {isEditing && (
              <Button type="submit" disabled={isSubmitting} className="w-full">
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
      </div>
    </div>
  );
};