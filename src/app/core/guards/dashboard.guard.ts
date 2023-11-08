import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs'

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authUser$.pipe(
    map((user) =>{
      return !!user ? true : router.createUrlTree(['/auth/login'])
    })
  )
};
