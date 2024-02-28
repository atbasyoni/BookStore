import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { FeaturedBooksComponent } from '../featured-books/featured-books.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    FeaturedBooksComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
