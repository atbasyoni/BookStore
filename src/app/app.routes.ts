import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-details/book-details.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { BookManagementComponent } from './admin/book-management/book-management.component';
import { AddBookComponent } from './admin/book-management/add-book/add-book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'book', component: BookListComponent },
  //{ path: 'book/:id', component: BookDetailComponent },
  //{ path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: 'bookmg', component: BookManagementComponent },
  { path: 'addbook', component: AddBookComponent }
];
