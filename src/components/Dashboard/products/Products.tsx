import { fetchAllProducts } from "@/api/product";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hook";
import type { RootState } from "@/store/store";
import { Plus, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "@/api/category";

const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.product.products);
  const categories = useSelector((state: RootState) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProducts());
      await dispatch(fetchAllCategories())
    };
    if (!products) {
      fetchData();
    }
  }, [dispatch, products]);

  // Filtering and searching logic
  const filteredProducts = products
    ? products.filter((product) => {
        // Filter by category
        const categoryMatch =
          selectedCategory === "All" || product.category.name === selectedCategory;
        // Filter by search query
        const nameMatch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return categoryMatch && nameMatch;
      })
    : [];

  return (
    <div className="w-full min-h-screen p-8 overflow-hidden">
      <div className="w-full flex items-center justify-between mb-8 mt-8 fade-in animate-in slide-in-from-top duration-700">
        <h1 className="text-2xl font-bold md:text-4xl ">Manage Products</h1>
        <Button
          className="text-md bg-amber-600 hover:bg-amber-500 cursor-pointer hover:scale-95 shadow-[0_0_5px] shadow-amber-400 font-bold p-5"
          onClick={() => navigate("/dashboard/products/add")}
        >
          <Plus /> Add Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="w-full  dark:from-slate-900 dark:to-gray-900 rounded-xl p-6 shadow-lg mb-8 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-right duration-400">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-500 dark:text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 md:flex-initial min-w-[180px] px-4 py-2.5 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-cyan-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-cyan-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active filters indicator */}
        {(selectedCategory !== "All" || searchQuery) && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="ml-1 hover:text-green-900 dark:hover:text-green-300"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="w-full fade-in animate-in slide-in-from-bottom duration-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;