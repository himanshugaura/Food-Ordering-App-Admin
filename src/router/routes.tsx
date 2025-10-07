import  Login  from "@/pages/Login";
import type { AppRoute } from "../types/type";
import Dashboard from "@/pages/Dashboard";

export const appRoutes: AppRoute[] = [
  { path: '/login', element: <Login />, guest: true },
  { path: '/dashboard', element: <Dashboard /> , protected: true },
];

