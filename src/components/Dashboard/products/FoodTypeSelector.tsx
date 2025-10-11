import React from 'react';
import { Leaf, Beef } from 'lucide-react';
import { FoodType } from '@/constants/typeConstants';

interface FoodTypeSelectorProps {
  value: FoodType
  onChange: (foodType: FoodType) => void;
}

export const FoodTypeSelector: React.FC<FoodTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(FoodType.VEG)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
          value === FoodType.VEG
            ? 'border-green-500 bg-green-500/10 text-green-400'
            : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500'
        }`}
      >
        <Leaf className="w-4 h-4" />
        Veg
      </button>
      <button
        type="button"
        onClick={() => onChange(FoodType.NONVEG)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
          value === FoodType.NONVEG
            ? 'border-red-500 bg-red-500/10 text-red-400'
            : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500'
        }`}
      >
        <Beef className="w-4 h-4" />
        Non-Veg
      </button>
    </div>
  );
};