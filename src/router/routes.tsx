import  Login  from "@/pages/Login";
import type { AppRoute } from "../types/type";
import Dashboard from "@/pages/Dashboard";
import Home from "@/components/Dashboard/home/Home";
import Settings from "@/components/Dashboard/settings/Settings";
import Products from "@/components/Dashboard/products/Products";
import Category from "@/components/Dashboard/category/Category";
import Analytics from "@/components/Dashboard/analytics/Analytics";

export const appRoutes: AppRoute[] = [
  { path: '/login', element: <Login />, guest: true },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <div>Product Details</div> },
      { path: "category", element: <Category /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
];

