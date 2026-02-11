import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check for local storage mock user
  const user = localStorage.getItem('netflix_user');

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
