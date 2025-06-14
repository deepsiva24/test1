import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // For now, let's assume a user is logged in if they are not on the login page
  // In a real application, you would check a token, a service, etc.
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    // Redirect to the login page if not logged in
    return router.parseUrl('/login');
  }
}; 