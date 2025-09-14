import { Check, Search, X } from "lucide-react";
import { useState } from "react";

// Home Component (Order Management)
const Home: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState("#351");
  interface OrderItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  time: string;
  items: OrderItem[];
  status: "pending" | "rejected" | "completed";
  customerAvatar: string;
  customerColor: string;
}

   const orders: Order[] = [
    {
      id: "#351",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "pending",
      customerAvatar: "👨🏾‍🦱",
      customerColor: "bg-green-500",
      items: [
        {
          name: "Vegetable Mixups",
          description: "Vegetable Fritters with Egg",
          price: 5.3,
          quantity: 1,
          image: "🥗",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
    {
      id: "#350",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "rejected",
      customerAvatar: "👨🏽",
      customerColor: "bg-orange-500",
      items: [
        {
          name: "Baked Pasted Dishes",
          description: "Vegetable Fritters with Egg",
          price: 2.48,
          quantity: 1,
          image: "🍝",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
    {
      id: "#349",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "completed",
      customerAvatar: "👨🏿",
      customerColor: "bg-purple-500",
      items: [
        {
          name: "Vegetable Mixups",
          description: "Vegetable Fritters with Egg",
          price: 5.3,
          quantity: 1,
          image: "🥗",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
    {
      id: "#348",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "pending",
      customerAvatar: "👨🏾‍🦱",
      customerColor: "bg-green-500",
      items: [
        {
          name: "Vegetable Mixups",
          description: "Vegetable Fritters with Egg",
          price: 5.3,
          quantity: 1,
          image: "🥗",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
    {
      id: "#347",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "rejected",
      customerAvatar: "👨🏽",
      customerColor: "bg-orange-500",
      items: [
        {
          name: "Baked Pasted Dishes",
          description: "Vegetable Fritters with Egg",
          price: 2.48,
          quantity: 1,
          image: "🍝",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
    {
      id: "#346",
      date: "05 Feb 2023",
      time: "08:28 PM",
      status: "completed",
      customerAvatar: "👨🏿",
      customerColor: "bg-purple-500",
      items: [
        {
          name: "Vegetable Mixups",
          description: "Vegetable Fritters with Egg",
          price: 5.3,
          quantity: 1,
          image: "🥗",
        },
        {
          name: "Chinese Takeout Dish",
          description: "Fresh Prawn mix salad",
          price: 5.3,
          quantity: 1,
          image: "🍜",
        },
      ],
    },
  ];

  const orderNumbers = [
    "#345",
    "#346",
    "#347",
    "#348",
    "#349",
    "#350",
    "#351",
    "#352",
    "#353",
    "#354",
  ];

  const getStatusButton = (status: string, orderId: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
              <X size={16} />
            </button>
            <button className="p-2 rounded-lg border border-green-200 text-green-500 hover:bg-green-50">
              <Check size={16} />
            </button>
          </div>
        );
      case "rejected":
        return (
          <button className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-sm">
            REJECTED
          </button>
        );
      case "completed":
        return (
          <button className="px-4 py-2 rounded-lg bg-green-100 text-green-600 text-sm">
            COMPLETED
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
           <header className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-80"
              />
            </div>
          </div>
        </header>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order List</h2>

        {/* Order Number Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {orderNumbers.map((orderNum) => {
            const isActive = orderNum === activeOrder;
            const order = orders.find((o) => o.id === orderNum);
            const statusColor =
              order?.status === "rejected"
                ? "border-red-200 text-red-500"
                : order?.status === "completed"
                ? "border-green-200 text-green-500"
                : isActive
                ? "border-orange-500 text-orange-600 bg-orange-50"
                : "border-gray-200 text-gray-500";

            return (
              <button
                key={orderNum}
                onClick={() => setActiveOrder(orderNum)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap ${statusColor}`}
              >
                {orderNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                <p className="text-sm text-gray-500">
                  {order.date}, {order.time}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-full ${order.customerColor} flex items-center justify-center text-white text-lg`}
              >
                {order.customerAvatar}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">X2 Items</span>
              {getStatusButton(order.status, order.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;