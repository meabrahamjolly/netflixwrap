import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Story {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
  bg: string;
}

interface YearData {
  year: number;
  stories: Story[];
  themeColor: string;
}

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapped.html',
  styleUrl: './wrapped.scss'
})
export class Wrapped implements OnInit, OnDestroy {
  selectedYear = signal<number | null>(null);
  currentStories = signal<Story[]>([]);
  currentIndex = signal(0);
  progress = signal(0);
  intervalId: any;

  wrappedData: YearData[] = [
    {
      year: 2025,
      themeColor: 'linear-gradient(45deg, #FF0055, #0000FF)',
      stories: [
        { id: 1, type: 'intro', title: '2025 Wrapped', subtitle: 'The future of streaming.', bg: '#FF0055' },
        { id: 2, type: 'stat', title: '24,500', subtitle: 'Minutes Watched', description: "You lived in the cloud this year.", bg: '#1e1e1e' },
        { id: 3, type: 'top', title: 'Top Movie', subtitle: 'Avatar 4', image: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', bg: '#002' },
        { id: 4, type: 'summary', title: 'See you in 2026!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #FF0055, #0000FF)' }
      ]
    },
    {
      year: 2024,
      themeColor: 'linear-gradient(45deg, #E50914, #B81D24)',
      stories: [
        { id: 1, type: 'intro', title: '2024 Wrapped', subtitle: 'Ready to see what you watched?', bg: 'linear-gradient(45deg, #E50914, #000)' },
        { id: 2, type: 'stat', title: '18,299', subtitle: 'Minutes Watched', description: "That's like watching Stranger Things 20 times!", bg: '#1e1e1e' },
        { id: 3, type: 'genre', title: 'Top Genre', subtitle: 'Sci-Fi & Fantasy', description: 'You love escaping reality.', bg: '#4B0082' },
        { id: 4, type: 'show', title: 'Top Show', subtitle: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', bg: '#000' },
        { id: 5, type: 'summary', title: 'See you in 2025!', subtitle: 'Share your wrap.', bg: 'linear-gradient(to bottom right, #E50914, #B81D24)' }
      ]
    },
    {
      year: 2023,
      themeColor: 'linear-gradient(45deg, #00C9FF, #92FE9D)',
      stories: [
        { id: 1, type: 'intro', title: '2023 Wrapped', subtitle: 'A year of blockbusters.', bg: '#00C9FF' },
        { id: 2, type: 'stat', title: 'Top Genre', subtitle: 'Action', description: 'Adrenaline junkie status confirmed.', bg: '#222' },
        { id: 3, type: 'movie', title: 'Top Movie', subtitle: 'Extraction 2', image: 'https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgadiRKSnDftO.jpg', bg: '#333' },
        { id: 4, type: 'summary', title: 'Thanks for watching!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #00C9FF, #92FE9D)' }
      ]
    },
    {
      year: 2022,
      themeColor: 'linear-gradient(45deg, #fc4a1a, #f7b733)',
      stories: [
        { id: 1, type: 'intro', title: '2022 Wrapped', subtitle: 'Wednesday & The Sandman.', bg: '#fc4a1a' },
        { id: 2, type: 'show', title: 'Top Show', subtitle: 'Wednesday', image: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', bg: '#111' },
        { id: 3, type: 'summary', title: 'What a year!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #fc4a1a, #f7b733)' }
      ]
    },
    {
      year: 2021,
      themeColor: 'linear-gradient(45deg, #8E2DE2, #4A00E0)',
      stories: [
        { id: 1, type: 'intro', title: '2021 Wrapped', subtitle: 'Red Light, Green Light.', bg: '#4A00E0' },
        { id: 2, type: 'show', title: 'Global Hit', subtitle: 'Squid Game', image: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', bg: '#000' },
        { id: 3, type: 'summary', title: '45.6 Billion Won!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #8E2DE2, #4A00E0)' }
      ]
    },
    {
      year: 2020,
      themeColor: 'linear-gradient(45deg, #FDC830, #F37335)',
      stories: [
        { id: 1, type: 'intro', title: '2020 Wrapped', subtitle: 'The year we stayed home.', bg: '#F37335' },
        { id: 2, type: 'show', title: 'Top Show', subtitle: 'Tiger King', image: 'https://image.tmdb.org/t/p/w500/pmjYMC0FlYiKD5M163b2hXEbB4L.jpg', bg: '#222' },
        { id: 3, type: 'stat', title: '50,000', subtitle: 'Minutes Watched', description: 'We all binged a lot this year.', bg: '#111' },
        { id: 4, type: 'summary', title: 'Stay Safe!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #FDC830, #F37335)' }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // Start with selection screen, no auto start
  }

  selectYear(year: number) {
    const data = this.wrappedData.find(d => d.year === year);
    if (data) {
      this.selectedYear.set(year);
      this.currentStories.set(data.stories);
      this.currentIndex.set(0);
      this.startStory();
    }
  }

  closeSelection() {
    this.router.navigate(['/']);
  }

  returnToSelection() {
    this.stopStory();
    this.selectedYear.set(null);
  }

  ngOnDestroy() {
    this.stopStory();
  }

  startStory() {
    this.stopStory();
    this.progress.set(0);

    // Auto advance
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
    const stories = this.currentStories();
    if (this.currentIndex() < stories.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.startStory();
    } else {
      this.returnToSelection();
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.startStory();
    }
  }
}
