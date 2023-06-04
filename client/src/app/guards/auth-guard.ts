import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const authGuard = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated) {
        router.navigate(['login']);
        return false;
    }
    return true;

}