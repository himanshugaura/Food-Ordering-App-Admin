import type { FoodType, OrderStatus, PaymentMethod } from "@/constants/typeConstants";
import type { JSX } from "react";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  children?: AppRoute[];
  protected?: boolean;
  guest?: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category  {
  _id: string;
  name: string;
  image: {
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product  {
  _id: string;
  name: string;
  description: string;
  foodType: FoodType;
  isAvailable: Boolean;
  price: number;
  category: Category;
  image: {
    publicId: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  _id: string;
  name: string;
  address: string;
  logo: {
    publicId: string;
    url: string;
  };
  isOpen: boolean;
  orderCounter: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface OrderItem {
  product: Product ;   
  quantity: number;          
}

export interface Orders  {
  _id: string;
  user: Customer;
  orderItems: OrderItem[];  
  orderNo: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod : PaymentMethod;
  isPaid : boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}