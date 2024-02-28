import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = Number(params['page']) || 1;
      this.loadBooks();
    });
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooks(this.currentPage)
      .subscribe({
        next: (response) => {
          this.books = response.data;
          this.totalPages = response.totalPages;
          this.isLoading = false;
          this.error = null;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
          console.error('Error loading books:', error);
        }
      });
  }

  onPageChange(pageNumber: number) {
    this.router.navigate(['/books'], { queryParams: { page: pageNumber } });
  }
}
