import { inject } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "@app/services/auth.service";
import decode from 'jwt-decode';

export const roleGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const activatedRouteSnapshot = inject(ActivatedRouteSnapshot);

    const expectedRole = activatedRouteSnapshot.data.expectedRole;

    const token = localStorage.getItem('token');

    if(!token) {
        router.navigate(['login']);
        return false;
    }

    const tokenPayload = decode(token);

    if (
        !authService.isAuthenticated || tokenPayload.
    )
}