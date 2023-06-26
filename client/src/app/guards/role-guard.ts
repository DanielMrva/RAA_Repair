import { inject } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from "@app/services/auth.service";
import decode from 'jwt-decode';

export const RoleGuard = () => {
    const router = inject(Router);
    const route = inject(ActivatedRouteSnapshot);
    const authService = inject(AuthService);


    const expectedRole: Array<string> = route.data['role'];

    const localUser = localStorage.getItem('user');

    // const token = localStorage.getItem('token')!;

    // const tokenPayload = decode(token);

    return authService.loggedUser$.pipe(
        filter((loggedUser) => loggedUser !== undefined), 
        map((loggedUser) => {
            if (!loggedUser || !expectedRole.includes(loggedUser.accessLevel)) {
                router.navigateByUrl('/');
                return false;
            }
            return true
        })
    )
    
}