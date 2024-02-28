import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookListComponent },
  { path: 'book/{:id}', component: BookDetailComponent },
];
