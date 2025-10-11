import { fetchAllProducts } from "@/api/product";
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hook";
import type { RootState } from "@/store/store";
import { Plus } from "lucide-react"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useSelector((state : RootState) => state.product.products);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProducts());
    };
    if (!products) {  
      fetchData();
    }
  }, [dispatch , products]);
  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-full flex items-center justify-between mb-8 mt-8 fade-in animate-in slide-in-from-top duration-700">
        <h1 className="text-2xl font-bold md:text-4xl ">Manage Products</h1>
        <Button className="text-md bg-amber-600 hover:bg-amber-500 cursor-pointer hover:scale-95 shadow-[0_0_5px] shadow-amber-400 font-bold p-5"
        onClick={() => navigate("/dashboard/products/add")}><Plus />Add Product</Button>
      </div>

      <div className="w-full fade-in animate-in slide-in-from-bottom  duration-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No products available.</p>
        )}

      </div>
      </div>

    </div>
  )
}

export default Products