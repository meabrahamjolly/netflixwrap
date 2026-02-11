import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  banner?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Stranger Things',
      thumbnail: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      banner: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJunUsc0I.jpg',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
    },
    {
      id: 2,
      title: 'The Witcher',
      thumbnail: 'https://image.tmdb.org/t/p/w500/7vjaCdMWasJOacfC1dVCUIK2fQD.jpg',
      description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.'
    },
    {
      id: 3,
      title: 'Breaking Bad',
      thumbnail: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.'
    },
    {
      id: 4,
      title: 'Black Mirror',
      thumbnail: 'https://image.tmdb.org/t/p/w500/7Rum2nPOiZK5UaeX3tF1hS5nUbf.jpg',
      description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.'
    },
    {
        id: 5,
        title: 'Money Heist',
        thumbnail: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
        description: 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.'
    },
    {
        id: 6,
        title: 'Dark',
        thumbnail: 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYu5WXRPFufxZ.jpg',
        description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.'
    }
  ];

  getFeaturedMovie(): Observable<Movie> {
    return of(this.mockMovies[0]);
  }

  getTrendingMovies(): Observable<Movie[]> {
    return of(this.mockMovies);
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return of([...this.mockMovies].reverse()); // Just to show different order
  }

  getActionMovies(): Observable<Movie[]> {
      return of(this.mockMovies.slice(0, 4));
  }
}
