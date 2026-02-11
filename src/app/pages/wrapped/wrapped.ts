
import { Component, signal, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Story {
  id: number;
  type: 'intro' | 'overview' | 'stat' | 'top' | 'genre' | 'show' | 'movie' | 'summary' | 'top-list' | 'genre-insight';
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
  bg: string;
  // New optional fields for specific slide types
  stats?: {
    label: string;
    value: string | number;
    subtext?: string;
  }[];
  chart?: {
    label: string;
    value: number;
    color: string;
  }[];
  topList?: {
    rank: number;
    title: string;
    image: string;
  }[];
}

interface BingeStats {
  longestSession: string; // "8 hrs"
  lateNightCount: number; // "14 nights past 2AM"
  weekendMarathons: number; // "12 weekends"
  mostRewatched: string; // "The Office"
}

interface DetailedStats {
  activeMonth: string;
  activeDay: string; // "Saturday"
  dayTime: 'Night Owl' | 'Early Bird';
  totalMinutes: number;
}

interface GenreStats {
  topGenre: string;
  pieChart: { label: string; value: number; color: string; }[];
  surpriseGenre: string;
  personalityType: string; // "The Sci-Fi Visionary"
}

export interface YearData {
  year: number;
  themeColor: string;
  totalHours: number;
  totalTitles: number;
  joinDate: string;
  mostActiveMonth: string;
  stories: Story[];
  // Advanced stats
  bingeStats?: BingeStats;
  detailedStats?: DetailedStats;
  genreStats?: GenreStats;
  topMovies?: { rank: number; title: string; image: string; }[];
  topSeries?: { rank: number; title: string; image: string; }[];
}

import { DialogService } from '../../services/dialog';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-wrapped',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapped.html',
  styleUrl: './wrapped.scss'
})
export class Wrapped implements OnInit, OnDestroy {
  private dialogService = inject(DialogService);

  selectedYear = signal<number | null>(null);
  viewMode = signal<'selection' | 'story' | 'report'>('selection');
  currentStories = signal<Story[]>([]);
  currentIndex = signal(0);
  progress = signal(0);
  intervalId: any;

  wrappedData: YearData[] = [
    {
      year: 2025,
      themeColor: 'linear-gradient(45deg, #FF0055, #0000FF)',
      totalHours: 850,
      totalTitles: 142,
      joinDate: '2019',
      mostActiveMonth: 'December',
      // New Stats Data
      bingeStats: {
        longestSession: '12 hours',
        lateNightCount: 45,
        weekendMarathons: 18,
        mostRewatched: 'Stranger Things'
      },
      detailedStats: {
        activeMonth: 'December',
        activeDay: 'Saturday',
        dayTime: 'Night Owl',
        totalMinutes: 51000
      },
      genreStats: {
        topGenre: 'Sci-Fi',
        surpriseGenre: 'K-Drama',
        personalityType: 'The Sci-Fi Visionary',
        pieChart: [
          { label: 'Sci-Fi', value: 45, color: '#FF0055' },
          { label: 'Action', value: 25, color: '#0000FF' },
          { label: 'Drama', value: 20, color: '#8E2DE2' },
          { label: 'Comedy', value: 10, color: '#F37335' }
        ]
      },
      topMovies: [
        { rank: 1, title: 'Avatar 4', image: 'https://image.tmdb.org/t/p/w200/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
        { rank: 2, title: 'Extraction 3', image: 'https://m.media-amazon.com/images/M/MV5BZGQwNDdhODAtY2Y0Ni00YzFhLTk1OGUtY2RkMDAzNzBmZjAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
        { rank: 3, title: 'Dune: Part Three', image: 'https://m.media-amazon.com/images/M/MV5BNGY4NDkyNTEtNTE4Ny00NjI0LTgzYTEtN2UyZDRlODFlNTVlXkEyXkFqcGc@._V1_QL75_UX500_CR0,0,500,281_.jpg' },
        { rank: 4, title: 'The Batman II', image: 'https://static.wixstatic.com/media/c1cd62_d561fe431ccd4e12961e0b5562e7d736~mv2.jpg/v1/fill/w_568,h_298,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1cd62_d561fe431ccd4e12961e0b5562e7d736~mv2.jpg' },
        { rank: 5, title: 'Spider-Man 4', image: 'https://i.ytimg.com/vi/LHUU36LBjrk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB0glW-WXyv4QsdCByvDuRN7Tk5M' }
      ],
      topSeries: [
        { rank: 1, title: 'Stranger Things 5', image: 'https://image.tmdb.org/t/p/w200/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
        { rank: 2, title: 'Wednesday S2', image: 'https://image.tmdb.org/t/p/w200/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
        { rank: 3, title: 'The Witcher S5', image: 'https://img.etimg.com/thumb/width-1600,height-900,imgsize-1160551,resizemode-75,msid-109426403/magazines/panache/the-witcher-season-5-confirmed-as-the-last-chapter-by-netflix.jpg' },
        { rank: 4, title: 'One Piece S2', image: 'https://image.tmdb.org/t/p/w200/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' },
        { rank: 5, title: 'Black Mirror S7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS546YkH7AB5hn_hsiFgKuk7wD4vdDhwMwFMg&s' }
      ],
      stories: [
        { id: 1, type: 'intro', title: '2025 Wrapped', subtitle: 'The future of streaming.', bg: '#FF0055' },
        {
          id: 2,
          type: 'overview',
          title: 'Welcome back, Abraham',
          subtitle: 'You lived in the cloud.',
          bg: '#1e1e1e',
          stats: [
            { label: 'Hours Watched', value: 850 },
            { label: 'Titles Played', value: 142 },
            { label: 'Member Since', value: '2019' }
          ]
        },
        {
          id: 3,
          type: 'stat',
          title: 'Watching Habits',
          subtitle: 'Series vs. Movies',
          bg: '#111',
          chart: [
            { label: 'Series', value: 70, color: '#FF0055' },
            { label: 'Movies', value: 30, color: '#0000FF' }
          ],
          description: "You're a binge-watcher at heart."
        },
        {
          id: 4,
          type: 'top-list',
          title: 'Top 5',
          subtitle: 'Your Most Watched',
          bg: '#0a0a0a',
          topList: [
            { rank: 1, title: 'Avatar 4', image: 'https://image.tmdb.org/t/p/w200/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
            { rank: 2, title: 'Stranger Things 5', image: 'https://image.tmdb.org/t/p/w200/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
            { rank: 3, title: 'The Witcher', image: 'https://img.etimg.com/thumb/width-1600,height-900,imgsize-1160551,resizemode-75,msid-109426403/magazines/panache/the-witcher-season-5-confirmed-as-the-last-chapter-by-netflix.jpg' },
            { rank: 4, title: 'Cyberpunk 2077', image: 'https://image.tmdb.org/t/p/w200/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' },
            { rank: 5, title: 'Dark', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZHZSa2JH6P0MDUjVBJ0iEO5_K1yYjcd3Ow&s' }
          ]
        },
        {
          id: 5,
          type: 'genre-insight',
          title: 'Personality',
          subtitle: 'The Sci-Fi Visionary',
          bg: 'linear-gradient(135deg, #4B0082, #0000FF)',
          description: "You love exploring new worlds and future tech. 65% of your time was spent in Sci-Fi."
        },
        { id: 6, type: 'summary', title: 'See you in 2026!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #FF0055, #0000FF)' }
      ]
    },
    {
      year: 2024,
      themeColor: 'linear-gradient(45deg, #E50914, #B81D24)',
      totalHours: 1200,
      totalTitles: 300,
      joinDate: '2019',
      mostActiveMonth: 'November',
      stories: [
        { id: 1, type: 'intro', title: '2024 Wrapped', subtitle: 'Ready to rewind?', bg: 'linear-gradient(45deg, #E50914, #000)' },
        {
          id: 2,
          type: 'overview',
          title: 'Hello, Abraham',
          subtitle: 'What a year of streaming!',
          bg: '#1e1e1e',
          stats: [
            { label: 'Minutes Watched', value: '72,000' },
            { label: 'Titles Played', value: 300 },
            { label: 'Longest Binge', value: '8 hrs' }
          ]
        },
        {
          id: 3,
          type: 'stat',
          title: 'Content Split',
          subtitle: 'Movies vs. TV',
          bg: '#111',
          chart: [
            { label: 'Movies', value: 40, color: '#E50914' },
            { label: 'TV Shows', value: 60, color: '#FFFFFF' }
          ],
          description: "You dedicated your weekends to epic sagas."
        },
        {
          id: 4,
          type: 'top-list',
          title: 'Top 5',
          subtitle: 'Your Obsessions',
          bg: '#141414',
          topList: [
            { rank: 1, title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w200/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
            { rank: 2, title: 'Squid Game', image: 'https://image.tmdb.org/t/p/w200/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg' },
            { rank: 3, title: 'Wednesday', image: 'https://image.tmdb.org/t/p/w200/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
            { rank: 4, title: 'Black Mirror', image: 'https://image.tmdb.org/t/p/w200/5UaXY2SBJ9F36jXj0N2o4B7f0y9.jpg' },
            { rank: 5, title: 'Money Heist', image: 'https://image.tmdb.org/t/p/w200/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' }
          ]
        },
        {
          id: 5,
          type: 'genre-insight',
          title: 'Personality',
          subtitle: 'The Marathon Runner',
          bg: 'linear-gradient(135deg, #E50914, #B81D24)',
          description: "Once you start, you don't stop. You finished 12 complete series this year."
        },
        { id: 6, type: 'summary', title: 'See you in 2025!', subtitle: 'Share your wrap.', bg: 'linear-gradient(to bottom right, #E50914, #B81D24)' }
      ]
    },
    // ... (Keep other years simple for now or update similarly)
    {
      year: 2023,
      themeColor: 'linear-gradient(45deg, #00C9FF, #92FE9D)',
      totalHours: 900,
      totalTitles: 200,
      joinDate: '2019',
      mostActiveMonth: 'July',
      stories: [
        { id: 1, type: 'intro', title: '2023 Wrapped', subtitle: 'A year of blockbusters.', bg: '#00C9FF' },
        {
          id: 2,
          type: 'overview',
          title: 'Hey Abraham',
          subtitle: '2023 was a movie.',
          bg: '#222',
          stats: [
            { label: 'Hours Watched', value: 900 },
            { label: 'Titles Played', value: 200 }
          ]
        },
        { id: 3, type: 'movie', title: 'Top Movie', subtitle: 'Extraction 2', image: 'https://m.media-amazon.com/images/M/MV5BZGQwNDdhODAtY2Y0Ni00YzFhLTk1OGUtY2RkMDAzNzBmZjAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', bg: '#333' },
        { id: 4, type: 'summary', title: 'Thanks for watching!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #00C9FF, #92FE9D)' }
      ]
    },
    {
      year: 2022,
      themeColor: 'linear-gradient(45deg, #fc4a1a, #f7b733)',
      totalHours: 600,
      totalTitles: 150,
      joinDate: '2019',
      mostActiveMonth: 'October',
      stories: [
        { id: 1, type: 'intro', title: '2022 Wrapped', subtitle: 'Wednesday & The Sandman.', bg: '#fc4a1a' },
        {
          id: 2,
          type: 'overview',
          title: 'Abraham',
          subtitle: 'Spooky season all year.',
          bg: '#111',
          stats: [
            { label: 'Hours Watched', value: 600 },
            { label: 'Titles Played', value: 150 }
          ]
        },
        { id: 3, type: 'show', title: 'Top Show', subtitle: 'Wednesday', image: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', bg: '#111' },
        { id: 4, type: 'summary', title: 'What a year!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #fc4a1a, #f7b733)' }
      ]
    },
    {
      year: 2021,
      themeColor: 'linear-gradient(45deg, #8E2DE2, #4A00E0)',
      totalHours: 1100,
      totalTitles: 320,
      joinDate: '2019',
      mostActiveMonth: 'September',
      stories: [
        { id: 1, type: 'intro', title: '2021 Wrapped', subtitle: 'Red Light, Green Light.', bg: '#4A00E0' },
        {
          id: 2,
          type: 'overview',
          title: 'Abraham',
          subtitle: 'You played the game.',
          bg: '#000',
          stats: [
            { label: 'Hours Watched', value: 1100 },
            { label: 'Titles Played', value: 320 }
          ]
        },
        { id: 3, type: 'show', title: 'Global Hit', subtitle: 'Squid Game', image: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', bg: '#000' },
        { id: 4, type: 'summary', title: '45.6 Billion Won!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #8E2DE2, #4A00E0)' }
      ]
    },
    {
      year: 2020,
      themeColor: 'linear-gradient(45deg, #FDC830, #F37335)',
      totalHours: 1500,
      totalTitles: 450,
      joinDate: '2019',
      mostActiveMonth: 'April',
      stories: [
        { id: 1, type: 'intro', title: '2020 Wrapped', subtitle: 'The year we stayed home.', bg: '#F37335' },
        {
          id: 2,
          type: 'overview',
          title: 'Abraham',
          subtitle: 'We binged together.',
          bg: '#222',
          stats: [
            { label: 'Hours Watched', value: 1500 },
            { label: 'Titles Played', value: 450 }
          ]
        },
        { id: 3, type: 'show', title: 'Top Show', subtitle: 'Tiger King', image: 'https://www.dvdplanetstore.pk/wp-content/uploads/2024/01/dXQCEjVth8P8L47XIsoRt0oL8Gw-600x900.jpg', bg: '#222' },
        { id: 4, type: 'summary', title: 'Stay Safe!', subtitle: '#NetflixWrapped', bg: 'linear-gradient(to bottom right, #FDC830, #F37335)' }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // Default to 2025 Report Mode
    this.selectYear(2025);
    this.viewMode.set('report');
  }

  selectYear(year: number) {
    const data = this.wrappedData.find(d => d.year === year);
    if (data) {
      this.selectedYear.set(year);
      this.currentStories.set(data.stories);
      this.currentIndex.set(0);
      // If manually selecting, default to story mode unless it's initial load handled in ngOnInit
      if (this.viewMode() !== 'report') {
        this.startStory();
        this.viewMode.set('story');
      }
    }
  }

  switchToStory() {
    this.viewMode.set('story');
    this.currentIndex.set(0);
    this.startStory();
  }

  switchToSelection() {
    this.stopStory();
    this.selectedYear.set(null);
    this.viewMode.set('selection');
  }

  closeSelection() {
    this.router.navigate(['/']);
  }

  returnToSelection() {
    this.stopStory();
    this.selectedYear.set(null);
    this.viewMode.set('selection');
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

  openMovieDetail(title: string, image: string) {
    // Create a mock movie object from the passed data
    const movie: Movie = {
      id: Math.random(), // Just for the modal
      title: title,
      thumbnail: image,
      banner: image,
      description: 'Find out more about your top title of the year!'
    };
    this.dialogService.open(movie);
  }
}
