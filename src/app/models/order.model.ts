import { OrderItem, OrderStatus } from "./orderItem.model";

export interface Order{
  id: string;
  userId: string;
  createdAt: Date;
  status: OrderStatus; // Enum defining order statuses (e.g., "placed", "shipped", "completed", "cancelled")
  items: OrderItem[];
  //shippingAddress: Address; // Use your Address model
  //billingAddress: Address; // Use your Address model
  totalPrice: number;
  discount?: number; // Optional discount applied to the order
  //paymentDetails?: PaymentDetails; // Object containing payment information (e.g., method, transaction ID)
  // ... other relevant order details (tracking number, estimated delivery, etc.)
  // ... additional fields based on your specific requirements
}