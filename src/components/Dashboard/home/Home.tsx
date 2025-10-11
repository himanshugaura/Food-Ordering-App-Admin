import OrderCard from "./OrderCard"
import { DummyOrders } from "@/constants/DummyData"
import type { PendingOrder } from "@/types/type"

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center fade-in animate-in slide-in-from-top  duration-700">
        Manage Your Orders
      </h1>
      
      <div className="w-full animate-in fade-in slide-in-from-bottom  duration-700">
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