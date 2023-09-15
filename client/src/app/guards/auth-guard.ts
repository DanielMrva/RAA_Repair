import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';

export const authGuard = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.loggedUser$.pipe(
        filter((loggedUser) => loggedUser !== undefined), 
        map((loggedUser) => {
            if (!loggedUser) {
                router.navigateByUrl('/');
                return false;
            }
            return true
        })
    );

}