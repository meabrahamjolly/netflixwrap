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
      this.router.navigate(['/search'], { queryParams: { q: query } });
      // Optionally close the search input after searching
      // this.isSearchOpen = false;
    }
  }

  logout() {
    localStorage.removeItem('netflix_user');
    this.router.navigate(['/login']);
  }
}
