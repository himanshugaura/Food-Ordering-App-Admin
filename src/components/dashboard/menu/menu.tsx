import { useState, useEffect } from 'react';
import { Plus, Tag, Grid3X3, List, Search, Filter, ChefHat, Eye, Edit, Trash2, Package } from 'lucide-react';
import Button from '@/components/common/Button';
import ProductUploadPage from './uploadProduct';
import CategoryUploadPage from './category';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllCategories, getAllProducts } from '@/lib/api/menu';
import { Category, Product } from '@/types/type';

type ViewMode = 'categories' | 'products';
type UploadMode = null | 'category' | 'product';

export default function RestaurantMenuPage() {
  const dispatch = useAppDispatch();
  const {  categories, products } = useAppSelector(state => state.menu); // fixed naming

  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState<UploadMode>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch categories and products on mount
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await dispatch(getAllCategories());
      await dispatch(getAllProducts());
      setLoading(false);
    };
    fetchDetails();
  }, [dispatch]);

  // Helper: Get category name
  const getCategoryName = (category: string | Category): string => {
    return typeof category === 'string' ? category : category.name;
  };

  // Count products in a category
  const getCategoryProductCount = (categoryName: string): number => {
    return products?.filter(product => getCategoryName(product.category) === categoryName).length ?? 0;
  };

  // Filtered products
  const filteredProducts = products?.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const productCategoryName = getCategoryName(product.category);
    const matchesCategory = selectedCategory === 'all' || productCategoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  }) ?? [];

  // Filtered categories
  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  // Categories for product filter dropdown
  const productCategories = ['all', ...(products?.map(p => getCategoryName(p.category)) ?? [])];
  const uniqueProductCategories = Array.from(new Set(productCategories));

  if (!products || !categories) {
    return <div className='loader'></div>;
  }

  // Upload mode rendering
  if (uploadMode === 'category') return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={() => setUploadMode(null)} className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
          ← Back to Menu Management
        </button>
        <CategoryUploadPage />
      </div>
    </div>
  );

  if (uploadMode === 'product') return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={() => setUploadMode(null)} className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
          ← Back to Menu Management
        </button>
        <ProductUploadPage />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
                  <p className="text-gray-600">Manage your restaurant's categories and dishes</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setUploadMode('category')}
                cover={true} 
                variant="secondary"
              >
                <Tag className="w-4 h-4" />
                Add Category
              </Button>
              <Button 
                onClick={() => setUploadMode('product')}
                cover={true} 
                variant="secondary"
              >
                <Plus className="w-4 h-4" />
                Add Dish
              </Button>
            </div>
          </div>

          {/* View Toggle & Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('categories')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'categories' 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Categories ({categories.length})
                </button>
                <button
                  onClick={() => setViewMode('products')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'products' 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Dishes ({products.length})
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Available: {products.filter(p => p.isAvailable).length}</span>
                <span>•</span>
                <span>Unavailable: {products.filter(p => !p.isAvailable).length}</span>
                <span>•</span>
                <span>Veg: {products.filter(p => p.foodType === 'VEG').length}</span>
                <span>•</span>
                <span>Non-Veg: {products.filter(p => p.foodType === 'NON VEG').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={viewMode === 'categories' ? 'Search categories...' : 'Search dishes...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            {viewMode === 'products' && (
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all appearance-none cursor-pointer min-w-[180px]"
                >
                  {productCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-5 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : viewMode === 'categories' ? (
          // Categories View
          filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Categories Found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? "Try adjusting your search criteria" : "Start by creating your first category"}
              </p>
              <Button onClick={() => setUploadMode('category')} cover={true} variant="secondary">
                <Tag className="w-4 h-4 mr-2" />
                Add First Category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image.url} 
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button className="flex-1 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white transition-colors">
                          <Eye className="w-4 h-4 mx-auto" />
                        </button>
                        <button className="flex-1 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white transition-colors">
                          <Edit className="w-4 h-4 mx-auto" />
                        </button>
                        <button className="flex-1 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                      {category.name.toLowerCase()}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {getCategoryProductCount(category.name)} dishes
                    </p>
                    <button 
                      onClick={() => {
                        setViewMode('products');
                        setSelectedCategory(category.name);
                      }}
                      className="w-full py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      View Dishes →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          // Products View
          filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Dishes Found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || selectedCategory !== 'all' 
                  ? "Try adjusting your search or filter criteria" 
                  : "Start by adding your first dish"}
              </p>
              <Button onClick={() => setUploadMode('product')} cover={true} variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add First Dish
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image.url} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status and Food Type Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.isAvailable 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.foodType === 'VEG'
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.foodType === 'VEG' ? '🌱 Veg' : '🍖 Non-Veg'}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Edit className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-orange-600 font-medium mb-2 capitalize">
                      {getCategoryName(product.category).toLowerCase()}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mt-8 text-center text-gray-500">
            {viewMode === 'categories' ? (
              <>Showing {filteredCategories.length} of {categories.length} categories</>
            ) : (
              <>Showing {filteredProducts.length} of {products.length} dishes</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}