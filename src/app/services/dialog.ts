import { Injectable, signal } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  isOpen = signal(false);
  currentMovie = signal<Movie | null>(null);

  open(movie: Movie) {
    this.currentMovie.set(movie);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    this.currentMovie.set(null);
  }
}
