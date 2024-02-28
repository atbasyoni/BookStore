import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent implements OnInit {
  books: Book[] = [];
  loading = true; // Track data loading state
  error: string | null = null; // Store any error message

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe({
        next: (books) => {
          this.books = books;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'An error occurred while fetching books.';
          this.loading = false;
        },
      });
  }

  // Add methods for CRUD operations on books:
  addBook(book: Book) {
    this.bookService.addBook(book)
      .subscribe({
        next: (addedBook) => {
          // Update UI with the newly added book
          this.books.push(addedBook);
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while adding the book.';
        },
      });
  }

  editBook(book: Book) {
    this.bookService.editBook(book)
      .subscribe({
        next: (updatedBook) => {
          // Update the existing book in the UI
          const index = this.books.findIndex((b) => b.id === updatedBook.id);
          if (index !== -1) {
            this.books[index] = updatedBook;
          }
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while updating the book.';
        },
      });
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId)
      .subscribe({
        next: () => {
          // Remove the deleted book from the UI
          const index = this.books.findIndex((b) => b.id === bookId.toString());
          if (index !== -1) {
            this.books.splice(index, 1);
          }
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while deleting the book.';
        },
      });
  }

  // Additional methods (e.g., search, filter) as needed
}