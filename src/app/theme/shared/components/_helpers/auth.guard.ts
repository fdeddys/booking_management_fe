import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardChild implements CanActivateChild {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    console.log('auth guard : ', currentUser);
    console.log('is login ', this.authenticationService.isLoggedIn())
    if (currentUser && this.authenticationService.isLoggedIn()) {
      const { roles } = route.data;
      console.log('auth guard roles : ', roles);
      console.log('user role : ', currentUser.user.role)
      if (roles && !roles.includes(currentUser.user.role)) {
        // User not authorized, redirect to unauthorized page
        this.router.navigate(['/login']);
        return false;
      }
      // User is logged in and authorized for child routes
      return true;
    }

    // User not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
