import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GerneService } from '../../services/gerne.service';
import { Genre } from '../../models/genre.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private genreService: GerneService) {}

  ngOnInit() {
      this.loadGenres();
  }

  loadGenres() {
    this.genreService.getGenres().subscribe(
      response => this.genres = response
    );
  }
}
