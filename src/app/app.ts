import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { MovieRow } from './components/movie-row/movie-row';
import { MovieService, Movie } from './services/movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Hero, MovieRow, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  movieService = inject(MovieService);

  featuredMovie$!: Observable<Movie>;
  trendingMovies$!: Observable<Movie[]>;
  topRatedMovies$!: Observable<Movie[]>;
  actionMovies$!: Observable<Movie[]>;

  ngOnInit() {
    this.featuredMovie$ = this.movieService.getFeaturedMovie();
    this.trendingMovies$ = this.movieService.getTrendingMovies();
    this.topRatedMovies$ = this.movieService.getTopRatedMovies();
    this.actionMovies$ = this.movieService.getActionMovies();
  }
}
