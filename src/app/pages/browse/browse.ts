import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [MovieCard, AsyncPipe],
  templateUrl: './browse.html',
  styleUrl: './browse.scss'
})
export class Browse implements OnInit {
  movieService = inject(MovieService);
  route = inject(ActivatedRoute);

  title = '';
  movies$!: Observable<Movie[]>;

  ngOnInit() {
    this.route.url.subscribe(segments => {
      const path = segments[0]?.path;

      switch (path) {
        case 'tv-shows':
          this.title = 'TV Shows';
          this.movies$ = this.movieService.getTrendingMovies();
          break;
        case 'movies':
          this.title = 'Movies';
          this.movies$ = this.movieService.getTopRatedMovies();
          break;
        case 'new-popular':
          this.title = 'New & Popular';
          this.movies$ = this.movieService.getTrendingMovies();
          break;
        case 'my-list':
          this.title = 'My List';
          this.movies$ = this.movieService.getActionMovies(); // Mock
          break;
      }
    });
  }
}
