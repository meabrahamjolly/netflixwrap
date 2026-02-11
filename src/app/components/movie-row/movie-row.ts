import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/movie';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-row',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-row.html',
  styleUrl: './movie-row.scss'
})
export class MovieRow {
  @Input() title: string = '';
  @Input() movies: Movie[] = [];
}
