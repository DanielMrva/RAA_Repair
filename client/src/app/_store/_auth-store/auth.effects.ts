import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import * as AuthActions from "./auth.actions"
import { of, from } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { ToastService } from "@app/services/toast/toast.service";
import { AuthService } from "@app/services/auth/auth.service";

@Injectable()
export class AuthEffects {

    constructor(
        private store: Store<AppState>,
        private toastService: ToastService,
        private authService: AuthService,
        private actions$: Actions
    ) {}

    autoLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            switchMap(() =>
                from(this.authService.autoLogin()).pipe(
                    mergeMap((localUser) => {
                        if (localUser) {
                            const username = localUser.username;
                            const orgName = localUser.orgName;
                            const accessLevel = localUser.accessLevel;

                            return [AuthActions.setAuthInfo({ username, orgName, accessLevel })];
                        } else {
                            // If no user found, return an empty array or other action if needed.
                            return [];
                        }
                    })
                )
            )
        )
    );

    saveAuthInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.setAuthInfo),
            map((AuthInfo) => {
                localStorage.setItem('user', JSON.stringify(AuthInfo));
            })
        ),
        { dispatch: false }
    );

}





