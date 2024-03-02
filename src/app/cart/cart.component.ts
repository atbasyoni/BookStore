import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cartItem.model';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart data changes to update UI dynamically
    this.cartService.cartData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(items => {
        this.cartItems = items;
        this.totalPrice = this.cartService.calculateTotalPrice();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(); // Unsubscribe from subscriptions
    this.unsubscribe$.complete();
  }

  onUpdateQuantity(item: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(item, newQuantity);
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  onCheckout() {
    // Navigate to checkout page or initiate checkout process
    // This would depend on your specific implementation
  }
}
