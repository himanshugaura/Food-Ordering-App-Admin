import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import OrderCard from "./OrderCard"
import { DummyOrders } from "@/constants/DummyData"
import type { PendingOrder } from "@/types/type"

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center">
        Manage Your Orders
      </h1>
      
      <div className="relative w-full max-w-md mb-6 sm:mb-8">
        <Input
          placeholder="Search orders by id or customer name..."
          className="w-full py-4 sm:py-5 pl-4 sm:pl-5 pr-12 sm:pr-14 rounded-xl border-2 text-white placeholder:text-gray-400 text-base sm:text-lg shadow-lg focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-white opacity-70 pointer-events-none" size={24} />
      </div>
      
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {DummyOrders.map((order) => (
            <div key={order._id}>
              <OrderCard order={order as PendingOrder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home