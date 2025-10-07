import type { JSX } from "react";

export interface AppRoute {
  path: string;
  element: JSX.Element;
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