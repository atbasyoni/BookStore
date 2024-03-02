import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GerneService } from '../../services/gerne.service';
import { Genre } from '../../models/genre.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from '../../models/cartItem.model';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  genres: Genre[] = [];
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private unsubscribe$ = new Subject<void>();
  isLoggedIn!: boolean;

  constructor(
    private genreService: GerneService,
    private cartService: CartService,
    private authService: AuthService,
    private accountService: AccountService
    ) {}

  ngOnInit() {
      //this.loadGenres();
      this.cartService.cartData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(items => {
        this.cartItems = items;
        this.totalPrice = this.cartService.calculateTotalPrice();
      });
      this.isLoggedIn = this.authService.isLoggedIn();
      console.log(this.isLoggedIn);
  }

  loadGenres() {
    this.genreService.getGenres().subscribe(
      response => this.genres = response
    );
  }

  logout() {
    this.accountService.logout();
  }

  onUpdateQuantity(item: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(item, newQuantity);
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
