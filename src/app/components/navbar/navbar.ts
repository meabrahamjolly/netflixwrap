import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isScrolled = false;
  isDropdownOpen = false;
  isSearchOpen = false;
  router = inject(Router);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onSearch(event: any) {
    const query = event.target.value;
    if (query && query.trim().length > 0) {
      console.log('Searching for:', query);
      // For now, just log or maybe navigate to a search page if we had one
      // this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  logout() {
    localStorage.removeItem('netflix_user');
    this.router.navigate(['/login']);
  }
}
