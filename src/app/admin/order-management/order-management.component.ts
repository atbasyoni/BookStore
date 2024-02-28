import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  loading = true; // Track data loading state
  error: string | null = null; // Store any error message
  selectedOrder: Order | null = null; // For order details

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe({
        next: (orders) => {
          this.orders = orders;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'An error occurred while fetching orders.';
          this.loading = false;
        },
      });
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
  }

  // Add methods for order management:
  updateOrderStatus(orderId: number, newStatus: string) {
    this.orderService.updateOrderStatus(orderId, newStatus)
      .subscribe({
        next: (updatedOrder) => {
          // Update the order status in the UI
          const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          // Optionally clear selected order after update
          this.selectedOrder = null;
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while updating the order status.';
        },
      });
  }

  // Additional methods (e.g., search, filter, export orders) as needed
}