import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hook";
import type { RootState } from "@/store/store";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "@/api/category";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) => state.category.categories);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllCategories())
    };
    if (!categories) {
      fetchData();
    }
  }, [dispatch, categories]);

  // Filtering and searching logic
  const filteredCategories = categories
    ? categories.filter((category) => {
        const nameMatch = category.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return nameMatch;
      })
    : [];

  return (
    <div className="w-full min-h-screen p-8 overflow-hidden">
      <div className="w-full flex items-center justify-between mb-8 mt-8 fade-in animate-in slide-in-from-top duration-700">
        <h1 className="text-2xl font-bold md:text-4xl ">Manage Categories</h1>
        <Button
          className="text-md bg-amber-600 hover:bg-amber-500 cursor-pointer hover:scale-95 shadow-[0_0_5px] shadow-amber-400 font-bold p-5"
          onClick={() => navigate("/dashboard/category/add")}
        >
          <Plus /> Add Category
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="w-full  dark:from-slate-900 dark:to-gray-900 rounded-xl p-6 shadow-lg mb-8  dark:border-gray-700 animate-in fade-in slide-in-from-right duration-400">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by category name..."
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full fade-in animate-in slide-in-from-bottom duration-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No categories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;