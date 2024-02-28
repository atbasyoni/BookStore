import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  bookCount: number = 0;
  orderCount: number = 0;
  recentOrders: any[] = []; // Replace with appropriate order data structure

  constructor(
    private bookService: BookService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.bookService.getBookCount().subscribe((count) => {
      this.bookCount = count;
    });

    this.orderService
      .getRecentOrders(10) // Adjust limit as needed
      .subscribe((orders) => {
        this.recentOrders = orders;
      });
  }

  // Add other dashboard-related methods here (e.g., logout, download reports)
}
