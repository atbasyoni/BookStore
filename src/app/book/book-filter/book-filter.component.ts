import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.scss'
})
export class BookFilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() genres: string[] = [];
  @Input() priceRange: { min?: number, max?: number } = {};
  @Output() filteredBooks = new EventEmitter<Book[]>();
  bookData : any;

  selectedCategory?: string;
  selectedGenres: string[] = [];
  minPrice: number = 0;
  maxPrice: number = Number.MAX_SAFE_INTEGER;

  constructor() {}

  ngOnInit() {
    // Initialize filter options based on input values
    this.selectedCategory = this.categories[0]; // Select first category
    this.minPrice = this.priceRange.min || 0;
    this.maxPrice = this.priceRange.max || Number.MAX_SAFE_INTEGER;
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.emitFilteredBooks();
  }

  onGenreChange(genre: string, checked: boolean) {
    if (checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
    this.emitFilteredBooks();
  }

  onPriceRangeChange(min: number, max: number) {
    this.minPrice = min || 0;
    this.maxPrice = max || Number.MAX_SAFE_INTEGER;
    this.emitFilteredBooks();
  }

  emitFilteredBooks() {
    // Implement logic to filter books based on selected options
    // and emit the filtered list through the filteredBooks event
    // Use the selectedCategory, selectedGenres, minPrice, and maxPrice
    // to filter your book data

    const filteredBooks = [...this.bookData]; // Replace with your actual book data
    if (this.selectedCategory) {
      filteredBooks.filter(book => book.category === this.selectedCategory);
    }
    if (this.selectedGenres.length > 0) {
      filteredBooks.filter(book => this.selectedGenres.includes(book.genre));
    }
    filteredBooks.filter(book => book.price >= this.minPrice && book.price <= this.maxPrice);

    this.filteredBooks.emit(filteredBooks);
  }
}

