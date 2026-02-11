import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Navbar } from '../../components/navbar/navbar';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, MovieCard, Navbar],
    templateUrl: './search.html',
    styleUrl: './search.scss'
})
export class SearchPage implements OnInit {
    private route = inject(ActivatedRoute);
    private movieService = inject(MovieService);

    query: string = '';
    results: Movie[] = [];
    isLoading = true;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.query = params['q'] || '';
            if (this.query) {
                this.performSearch();
            } else {
                this.results = [];
                this.isLoading = false;
            }
        });
    }

    performSearch() {
        this.isLoading = true;
        this.movieService.searchMovies(this.query).subscribe(movies => {
            this.results = movies;
            this.isLoading = false;
        });
    }
}
