import type { Product } from "@/types/type";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf,
  ChefHat,
  IndianRupee
} from "lucide-react";
import { useState } from "react";
import { FoodType } from "@/constants/typeConstants";

interface ProductCardProps {
  product: Product;
}

function capital(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalize(sentence: string): string {
  return sentence
    .split(" ")
    .map(word => capital(word))
    .join(" ");
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleProductClick = () => {
    navigate(`/dashboard/product/${product._id}`);
  };

  const getFoodTypeIcon = () => {
    switch (product.foodType) {
      case FoodType.VEG:
        return <Leaf className="w-3.5 h-3.5 text-green-600" />;
      case FoodType.NONVEG:
        return <ChefHat className="w-3.5 h-3.5 text-red-600" />;
      default:
        return null;
    }
  };

  const getFoodTypeColor = () => {
    switch (product.foodType) {
      case FoodType.VEG:
        return 'bg-green-50 text-green-700 border-green-200';
      case FoodType.NONVEG:
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-white shadow-sm shadow-white/70  transition-shadow duration-200 border border-gray-200 rounded-xl p-2">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 rounded-t-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-t-xl" />
          )}
          <img
            src={product.image.url}
            alt={product.name}
            className={`w-full h-52 object-cover hover:scale-105  duration-300 cursor-pointer transition-all  ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleProductClick}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-white text-gray-800 font-medium shadow-sm border-0 px-3 py-1 text-xs"
            >
              {capitalize(product.category.name)}
            </Badge>
          </div>

          {/* Food Type Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant="outline" 
              className={`${getFoodTypeColor()} font-medium shadow-sm px-2.5 py-1 text-xs border`}
            >
              {getFoodTypeIcon()}
              <span className="ml-1.5">{capital(product.foodType)}</span>
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Name and Price */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 
              className="text-lg font-semibold text-gray-900 cursor-pointer transition-colors duration-150 line-clamp-2 leading-tight hover:underline"
              onClick={handleProductClick}
            >
              {capitalize(product.name)}
            </h3>
            <div className="flex items-center text-green-600 font-bold text-lg whitespace-nowrap">
              <IndianRupee className="h-4 w-4" />
              {product.price}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;