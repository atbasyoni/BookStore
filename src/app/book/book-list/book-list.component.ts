import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/genre.model';
import { GerneService } from '../../services/gerne.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  genres: Genre[] = [];
  sortOptions: any[] = [
    { value: 'title', label: 'Title' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' }
  ];
  selectedGenre: string = '';
  selectedSort: string = 'title';

  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private genreService: GerneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedGenre = params['genre'] || '';
      this.selectedSort = params['sort'] || 'title';
      this.currentPage = parseInt(params['page'] || '1', 12);

      this.loadBooks();
    });
    this.loadGenres();
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooksWithFilters(this.selectedGenre, this.selectedSort, this.currentPage)
      .subscribe({
        next: (response) => {
          this.books = response.books;
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

  loadGenres(){
    this.genreService.getGenres().subscribe(
      response => this.genres = response
    )
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['/book'], { queryParams: { search: searchTerm } });
  }

  onGenreChange(genre: string) {
    this.router.navigate(['/book'], { queryParams: { genre: genre } });
  }

  onSortChange(sort: string) {
    this.router.navigate(['/book'], { queryParams: { sort: sort } });
  }

  onPageChange(page: number) {
    this.router.navigate(['/book'], { queryParams: { page: page } });
  }

  addToCart(book: any) {
    // Implement your cart logic here
    // e.g., call a service to add the book to the cart
    console.log(`Adding book ${book.title} to cart`);
  }
}
