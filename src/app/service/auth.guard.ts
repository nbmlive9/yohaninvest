import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from './token-storage.service';



export const AuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);

  // ✅ Check if user is logged in
  if (!tokenService.isLogged()) {
    router.navigate(['/auth-login']);
    return false;
  }

  const userRole = tokenService.getRole() || '';
  
  // ✅ Role check
  if (route.data && route.data['usertype']) {
    const allowedRoles = route.data['usertype'] as string[];
    if (!allowedRoles.includes(userRole)) {
      console.warn(`Access denied for role: ${userRole}`);
      router.navigate(['/auth-login']);
      return false;
    }
  }

  return true;
};
