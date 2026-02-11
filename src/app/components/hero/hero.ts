import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  @Input() movie!: Movie;
}
