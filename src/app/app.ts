import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { MovieDialog } from './components/movie-dialog/movie-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, MovieDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('NetflixWrap');
}
