import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  @Input() movie!: Movie;
  dialogService = inject(DialogService);

  openDialog() {
    this.dialogService.open(this.movie);
  }

  onImageError(event: any) {
    event.target.src = 'https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg';
  }
}
