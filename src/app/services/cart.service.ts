import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, throwError } from 'rxjs';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataSubj = new BehaviorSubject<CartItem[]>([]); // Subject for cart data
  cartData$: Observable<CartItem[]> = this.cartDataSubj.asObservable() // Observable stream
    .pipe(shareReplay(1)); // Share latest value and replay to new subscribers

  constructor() {
    // Load initial cart data from localStorage or API (if applicable)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        this.cartDataSubj.next(JSON.parse(storedCart) as CartItem[]);
      } catch (error) {
        // Handle invalid stored cart data
        console.error('Error parsing stored cart:', error);
        this.cartDataSubj.next([]);
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartDataSubj.value; // Return the current cart data snapshot
  }

  getTotalItems(): number {
    return this.cartDataSubj.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  calculateTotalPrice(): number {
    return this.cartDataSubj.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative.');
    }

    const updatedItems = this.cartDataSubj.value.map(
      (cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem)
    );

    this.cartDataSubj.next(updatedItems);
    this.saveCartToLocalStorage(); // Persist changes
  }

  removeItem(item: CartItem) {
    const updatedItems = this.cartDataSubj.value.filter((cartItem) => cartItem.id !== item.id);
    this.cartDataSubj.next(updatedItems);
    this.saveCartToLocalStorage(); // Persist changes
  }

  clearCart() {
    this.cartDataSubj.next([]);
    this.saveCartToLocalStorage(); // Persist changes
  }

  addToCart(newItem: CartItem): Observable<any> { // Replace `any` with appropriate response type
    const existingItem = this.cartDataSubj.value.find((item) => item.id === newItem.id);

    if (existingItem) {
      this.updateQuantity(existingItem, existingItem.quantity + newItem.quantity);
      return throwError( () => new Error('Item already exists in cart. Quantity updated.'));
    }

    const updatedItems = [...this.cartDataSubj.value, newItem];
    this.cartDataSubj.next(updatedItems);
    this.saveCartToLocalStorage(); // Persist changes

    // Optionally, return an observable with success response
    return new Observable<any>((observer) => observer.next({ message: 'Item added to cart' }));
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartDataSubj.value));
  }

  // Additional methods (optional):
  // - Apply discounts based on rules or promo codes
  // - Calculate shipping costs based on cart weight/destination
  // - Integrate with checkout service to submit order data
}
