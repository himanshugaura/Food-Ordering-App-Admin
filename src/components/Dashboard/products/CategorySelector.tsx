import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Salads',
  'Soups',
  'Sandwiches',
  'Pizza',
  'Pasta',
  'Seafood',
  'Vegetarian',
  'Vegan',
  'Gluten-Free'
];

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
}) => {
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
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};