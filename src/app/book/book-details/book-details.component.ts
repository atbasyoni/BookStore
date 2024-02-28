import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book | null>;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('id'));
        if (!bookId) {
          return throwError('Invalid book ID');
        }
        return this.bookService.getBook(bookId);
      })
    );
  }

  addToCart(book: Book) {
    // Implement logic to add book to cart (e.g., call a service or store in local storage)
  }
}