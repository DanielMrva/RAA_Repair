import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "@app/_store/app.state";
import { selectIsAuthenticated} from "@app/_store/_auth-store/auth.selectors";

export const authGuard = () => {

    const router = inject(Router);
    const store = inject(Store<AppState>);

    return store.select(selectIsAuthenticated).pipe(
        filter((selectIsAuthenticated) => selectIsAuthenticated !== null),
        map((selectIsAuthenticated) => {
            if (!selectIsAuthenticated) {
                router.navigateByUrl('/')
                return false;
            }
            return true;
        })
    );

};