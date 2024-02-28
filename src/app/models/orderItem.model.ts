import { Book } from "./book.model";

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  quantity: number;
  price: number;
  bookDetails?: Book; // Optional product details for convenience
  // ... other relevant item details (e.g., variations, customization options)
}

export enum OrderStatus {
  Placed = 'placed',
  Shipped = 'shipped',
  Completed = 'completed',
  Cancelled = 'cancelled',
  // ... any other relevant order statuses
}