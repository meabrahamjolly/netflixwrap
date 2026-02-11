import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Hero } from '../../components/hero/hero';
import { MovieRow } from '../../components/movie-row/movie-row';
import { MovieService, Movie } from '../../services/movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, MovieRow, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
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
