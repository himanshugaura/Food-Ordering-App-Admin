import {  Home, Settings, BarChart3, LogOut, Salad, NotebookTabs } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  path?: string;
}

export const sidebarData: SidebarItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'products',
    label: 'Products',
    icon: Salad,
  },
  {
    id: 'category',
    label: 'Category',
    icon: NotebookTabs,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: LogOut,
  }
];