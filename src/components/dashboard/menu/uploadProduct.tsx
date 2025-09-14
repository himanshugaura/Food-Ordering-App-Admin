import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Package, DollarSign, FileText, Tag, Utensils, ImageIcon, CheckCircle, X, IndianRupee } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/store';
import { uploadProduct } from '@/lib/api/menu';


// Define types
interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  foodType: string;
}

interface ImageFile extends File {
  preview?: string;
}

export default function ProductUploadPage() {
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    category: '',
    foodType: ''
  });
  
  // Image state
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const dispatch = useAppDispatch();
  
  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle drag and drop for image
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as ImageFile;
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });
  
  // Remove image
  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    const result = await dispatch(uploadProduct(name , image , price , description , category , foodType))
      
      setUploadSuccess(true);
      
      // Reset form after success
      
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          foodType: ''
        });
        setImage(null);
        setUploadSuccess(false);
    
      setIsUploading(false);

  };
  
  // Clean up object URLs
  const cleanUp = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
  };

  // Check if form is valid
  const isFormValid = formData.name && formData.price && formData.description && formData.category && formData.foodType && image;
  
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600 text-lg">Fill in the details below to add a new product to your menu</p>
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <p className="text-green-800 font-medium">Product uploaded successfully! 🎉</p>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Details Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                </div>
                
                {/* Product Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                    <Tag className="w-4 h-4 mr-2 text-gray-500" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="flex items-center text-sm font-medium text-gray-700">
                    <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                    Price
                  </label>
                  <div>
                   
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="1"
                      placeholder="000"
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  />
                </div>
                
                {/* Category and Food Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700">
                      <Package className="w-4 h-4 mr-2 text-gray-500" />
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                      <option value="">Select category</option>
                      <option value="fruits">🍎 Fruits</option>
                      <option value="vegetables">🥕 Vegetables</option>
                      <option value="dairy">🥛 Dairy</option>
                      <option value="bakery">🍞 Bakery</option>
                      <option value="meat">🥩 Meat</option>
                      <option value="seafood">🐟 Seafood</option>
                      <option value="beverages">🥤 Beverages</option>
                      <option value="snacks">🍿 Snacks</option>
                    </select>
                  </div>
                  
                  {/* Food Type Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="foodType" className="flex items-center text-sm font-medium text-gray-700">
                      <Utensils className="w-4 h-4 mr-2 text-gray-500" />
                      Food Type
                    </label>
                    <select
                      id="foodType"
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                      <option value="">Select food type</option>
                      <option value="vegetarian">🌱 Vegetarian</option>
                      <option value="vegan">🥬 Vegan</option>
                      <option value="gluten-free">🌾 Gluten-Free</option>
                      <option value="organic">🌿 Organic</option>
                      <option value="non-organic">🏭 Non-Organic</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Product Image</h2>
                  <span className="text-sm text-red-500">*</span>
                </div>
                
                <div
                  {...getRootProps()}
                  className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                    isDragActive 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  
                  {image && image.preview ? (
                    <div className="relative">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="mx-auto max-h-64 w-auto object-contain rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 font-medium">{image.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click or drag to replace image
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-200">
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Product Image
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Drag and drop your image here, or click to browse
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose File
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isUploading || !isFormValid}
                  className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl text-base font-medium text-white shadow-lg transition-all duration-200 transform ${
                    isUploading || !isFormValid
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-xl'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Uploading Product...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Product
                    </>
                  )}
                </button>
                
                {!isFormValid && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Please fill in all fields and upload an image to continue
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Make sure all product information is accurate before uploading
          </p>
        </div>
      </div>
    </div>
  );
}