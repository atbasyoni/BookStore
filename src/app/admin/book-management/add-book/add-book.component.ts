import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  addBookForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.addBookForm = this.fb.group({
      controls: {
        title: ['', [Validators.required]],
        isbn: ['', [Validators.required]],
        description: ['', [Validators.required]],
        pages: ['', [Validators.required]],
        language: ['', [Validators.required]],
        price: ['', [Validators.required]],
        publicationDate: ['', [Validators.required]],
        genreId: ['', [Validators.required]],
        authorId: ['', [Validators.required]],
      }
    });
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
}
