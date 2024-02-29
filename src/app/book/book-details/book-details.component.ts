import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  reviews: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.loadBook(bookId);
      //this.loadReviews(bookId);
    });
  }

  loadBook(bookId: number) {
    this.bookService.getBook(bookId)
      .subscribe(book => {
        this.book = book;
      });
  }
  /*
  loadReviews(bookId: string) {
    this.bookService.getReviews(bookId)
      .subscribe(reviews => {
        this.reviews = reviews;
      });
  }
  */

  addToCart() {
    if (this.book) {
      // Implement your cart logic here
      // e.g., call a service to add the book to the cart
      console.log(`Adding book ${this.book.title} to cart`);
    }
  }
}