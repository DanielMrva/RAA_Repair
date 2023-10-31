import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    loginUser,
    loginUserSuccess,
    loginUserFailure,
    logoutUser,
    addUser,
    addUserSuccess,
    addUserFailure,
    loadUsers,
    loadUsersSuccess,
    loadUsersFailure,
    loadOneUser,
    loadOneUserSuccess,
    loadOneUserFailure,
    editUser,
    editUserSuccess,
    editUserFailure
} from "./user.actions";
import { Router } from "@angular/router";
import { setAuthInfo, clearAuthInfo } from "../_auth-store/auth.actions";
import { UserService } from "@app/services/users/user.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, exhaustMap } from "rxjs/operators";
import { Store, createAction } from "@ngrx/store";
import { selectAllUsers } from "./user.selectors";
import { AppState } from "../app.state";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private userService: UserService,
        private toastService: ToastService,
        private router: Router
    ) { }

    // This runs when loadUsers action is dispactched
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() =>
                // call 
                from(this.userService.queryUsers()).pipe(
                    // Take the returned data from ApolloQueryResult and return a new success action containing the users
                    map(({ data }) => loadUsersSuccess({ users: data.users })),
                    // Or if there are errors, return a new failure action with the error
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );

    loadOneUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOneUser),
            switchMap(({ userId }) =>
                from(this.userService.querySingleUser(userId)).pipe(
                    map(({ data }) => loadOneUserSuccess({ user: data.user })),
                    catchError((error) => of(loadOneUserFailure({ error })))
                )
            )
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            switchMap(({ username, email, password, orgName }) =>
                this.userService.addUser(username, email, password, orgName).pipe(
                    map(({ data }) => addUserSuccess({ user: data?.addUser })),
                    catchError((error) => of(addUserFailure({ error })))


                )
            )
        )
    );

    addUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserSuccess),
            map(({ user }) => {
                this.toastService.show('User added successfully', {
                    delay: 3000
                }),
                    this.router.navigate(['one-user', user?._id])
            })
        ),
        { dispatch: false }
    );

    addUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit user. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    )

    editUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editUser),
            switchMap(({ id, updates }) =>
                this.userService.editUser(id, updates).pipe(
                    map(({ data }) => editUserSuccess({ user: data?.editUser })),
                    catchError((error) => of(editUserFailure({ error })))
                )
            )
        )
    );

    editUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserSuccess),
            map(({ user }) => {
                this.toastService.show('User edited successfully', {
                    delay: 3000
                }),
                    this.router.navigate(['one-user', user?._id])
            })
        ),
        { dispatch: false }
    );

    editUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit user. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginUser),
            switchMap(({ email, password }) =>
                this.userService.loginUser(email, password).pipe(
                    map(({ data }) => loginUserSuccess({ loginResults: data?.loginUser })),
                    catchError((error) => of(loginUserFailure({ error })))
                )
            )
        )
    );

    loginUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginUserSuccess),
            map(({ loginResults }) => {
                if (loginResults) {
                    const { username, orgName, accessLevel } = loginResults.user;

                    this.toastService.show(`Welcome ${loginResults.user.username} !`, {
                        classname: 'bg-success text-light',
                        delay: 3000
                    });

                    return setAuthInfo({ username, orgName, accessLevel })
                } else {
                    return clearAuthInfo();
                }
            })
        )
    );

    loginUserFailure$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginUserFailure),
            map(( { error }) => {
                this.toastService.show(`${error}`, {
                    classname: 'bg-danger text-light',
                    delay: 3000
                  }),
                  console.error(error)
            })
        ),
        { dispatch: false}
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutUser),
            map(() => clearAuthInfo())
        )
    );

}

