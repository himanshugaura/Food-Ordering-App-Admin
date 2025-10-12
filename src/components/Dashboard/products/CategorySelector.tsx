import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useAppDispatch } from '@/store/hook';
import { fetchAllCategories } from '@/api/category';

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
}) => {
  const categories = useSelector((state : RootState) => state.category.categories) || [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
     await dispatch(fetchAllCategories());
    }
    if (categories.length === 0) {
      fetchData();
    }
  }, [dispatch])
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-purple-500 transition-all duration-300 cursor-pointer"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};