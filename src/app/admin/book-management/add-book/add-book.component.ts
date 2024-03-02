import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Genre } from '../../../models/genre.model';
import { GerneService } from '../../../services/gerne.service';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  addBookForm!: FormGroup;
  genres: Genre[] = [];
  authors: Author[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private genreService: GerneService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.addBookForm = this.fb.group(
      {
        title: ['', [Validators.required]],
        isbn: ['', [Validators.required]],
        description: ['', [Validators.required]],
        pages: ['', [Validators.required]],
        language: ['', [Validators.required]],
        price: ['', [Validators.required]],
        publicationDate: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        image: ['', [Validators.required]],
        genreId: ['', [Validators.required]],
        authorId: ['', [Validators.required]],
      }
    );
    this.loadGenres();
    this.loadAuthors();
  }

  onSubmit() {
    if (this.addBookForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    this.isLoading = true;
    this.bookService.addBook(this.addBookForm.value)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/bookmg']); // Redirect to login after successful registration
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message; // Display error message
        }
      });
  }

  loadGenres() {
    this.genreService.getGenres().subscribe(
      response => this.genres = response
    )
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe(
      response => this.authors = response
    )
  }
}
