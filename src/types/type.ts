import { FoodType, OrderStatus, PaymentMethod } from "@/constants/constants";

export interface User {
  id: string;                
  name: string;
  phone: string;
  createdAt: string;         
  updatedAt: string;
}

export interface Admin {
  id: string;
  name: string;
  username: string;     
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  foodType: FoodType; 
  isAvailable: Boolean;       
  price: number;
  category: string | Category; 
  image: {
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: {
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: string | Product; 
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user: string | User;
  orderItems: OrderItem[];
  orderNo: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}
