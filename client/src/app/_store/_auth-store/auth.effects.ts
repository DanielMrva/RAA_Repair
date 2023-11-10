import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions"
import { of, from } from "rxjs";
import { switchMap, map, mergeMap, catchError, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { ToastService } from "@app/services/toast/toast.service";
import { AuthService } from "@app/services/auth/auth.service";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private toastService: ToastService,
        private authService: AuthService
    ) { }

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
                console.log(AuthInfo)
                localStorage.setItem('user', JSON.stringify(AuthInfo));
            })
        ),
        { dispatch: false }
    );

//     saveAuthInfo$ = createEffect(() => 
//     this.actions$.pipe(
//         ofType(AuthActions.setAuthInfo),
//         tap((authInfo) => {
//             console.log('Save Auth Info Effect Triggered:', authInfo);
//             localStorage.setItem('user', JSON.stringify(authInfo));
//         })
//     ),
//     { dispatch: false }
// );


}



