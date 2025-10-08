export const OrderStatus = {
  PENDING: 'PENDING',
  COOKING: 'COOKING',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const PaymentMethod = {
  CASH: 'CASH',
  ONLINE: 'ONLINE',
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export const FoodType = {
  VEG: "VEG",
  NONVEG: "NON VEG"
} as const;

export type FoodType = typeof FoodType[keyof typeof FoodType];