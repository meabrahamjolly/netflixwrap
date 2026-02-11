import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/movie';
import { DialogService } from '../../services/dialog';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  @Input() movie!: Movie;
  dialogService = inject(DialogService);

  openDialog() {
    this.dialogService.open(this.movie);
  }

  onImageError(event: any) {
    event.target.src = 'https://placehold.co/400x600?text=No+Image';
  }
}
