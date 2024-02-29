import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Book } from '../models/book.model';
import { FilterOptions } from '../models/filter-options-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:44398/api/book'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}
  
  getBooksWithFilters(genre?: string, sort?: string, page: number = 1): Observable<any> {
    let queryString = `?page=${page}`;
    
    if (genre) {
      queryString += `&genre=${genre}`;
    }

    if(sort) {
      queryString += `&sort=${sort}`;
    }
    
    return this.http.get<any>(`${this.apiUrl}${queryString}`);
  }

  getBook(id: number): Observable<Book | null> {
    // Make the HTTP request
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(() => of(null)) // Handle errors gracefully
      );
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl)
      .pipe(
        map((data: any) => data.books || data), // Handle potential API response format variations
        catchError(this.handleError)
      );
  }
  /*
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  */

  getBookCount(): Observable<any> {
    return of([]);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book)
      .pipe(
        catchError(this.handleError)
      );
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(errorMessage);
  }

  // Add other methods as needed, e.g., search, create, update, delete

}