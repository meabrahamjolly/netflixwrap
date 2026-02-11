import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapped.html',
  styleUrl: './wrapped.scss'
})
export class Wrapped implements OnInit, OnDestroy {
  stories = [
    {
      id: 1,
      type: 'intro',
      title: '2024 Wrapped',
      subtitle: 'Ready to see what you watched?',
      bg: 'linear-gradient(45deg, #E50914, #000)'
    },
    {
      id: 2,
      type: 'stat',
      title: '18,299',
      subtitle: 'Minutes Watched',
      description: "That's like watching Stranger Things 20 times!",
      bg: '#1e1e1e'
    },
    {
      id: 3,
      type: 'genre',
      title: 'Top Genre',
      subtitle: 'Sci-Fi & Fantasy',
      description: 'You love escaping reality.',
      bg: '#4B0082'
    },
    {
      id: 4,
      type: 'show',
      title: 'Top Show',
      subtitle: 'Stranger Things',
      image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      bg: '#000'
    },
    {
      id: 5,
      type: 'summary',
      title: 'See you in 2025!',
      subtitle: 'Share your wrap.',
      bg: 'linear-gradient(to bottom right, #E50914, #B81D24)'
    }
  ];

  currentIndex = signal(0);
  progress = signal(0);
  intervalId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startStory();
  }

  ngOnDestroy() {
    this.stopStory();
  }

  startStory() {
    this.stopStory();
    this.progress.set(0);

    // Auto advance every 5 seconds
    const duration = 5000;
    const step = 50;

    this.intervalId = setInterval(() => {
      this.progress.update(p => {
        if (p >= 100) {
          this.next();
          return 0;
        }
        return p + (100 / (duration / step));
      });
    }, step);
  }

  stopStory() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next() {
    if (this.currentIndex() < this.stories.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.startStory();
    } else {
      this.close();
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.startStory();
    }
  }

  close() {
    this.router.navigate(['/']);
  }
}
