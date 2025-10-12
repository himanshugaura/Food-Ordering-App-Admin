import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/type";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCategoryClick = () => {
    navigate(`/dashboard/category/${category._id}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl cursor-pointer transform hover:-translate-y-1">
      <CardContent className="p-3">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl aspect-square">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl" />
          )}
          <img
            src={category.image.url}
            alt={category.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCategoryClick}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Category Name */}
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-gray-800 text-sm tracking-tight line-clamp-1 group-hover:text-gray-900 transition-colors">
            {category.name.toUpperCase()}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;