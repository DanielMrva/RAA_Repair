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
    loadOrgUsers,
    loadOrgUsersFailure,
    loadOrgUsersSuccess,
    loadOneUser,
    loadOneUserSuccess,
    loadOneUserFailure,
    editUser,
    editUserSuccess,
    editUserFailure,
    deleteUser,
    deleteUserFailure,
    deleteUserSuccess
} from "./user.actions";
import { Router } from "@angular/router";
import { setAuthInfo, clearAuthInfo } from "../_auth-store/auth.actions";
import { UserService } from "@app/services/users/user.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, exhaustMap, tap } from "rxjs/operators";
import { Store, createAction } from "@ngrx/store";
import { selectAllUsers } from "./user.selectors";
import { AppState } from "../app.state";
import { loadLikeOrgs, loadOneOrg } from "../_org-store/org.actions";
import { AccessLevel } from "@app/utils/constants";

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
                from(this.userService.queryUsers().valueChanges).pipe(
                    // Take the returned data from ApolloQueryResult and return a new success action containing the users
                    map(({ data }) => loadUsersSuccess({ users: data.users })),
                    // Or if there are errors, return a new failure action with the error
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );

    loadOrgUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrgUsers),
            switchMap(({ orgName }) =>
                // call 
                from(this.userService.queryOrgUsers(orgName).valueChanges).pipe(
                    // Take the returned data from ApolloQueryResult and return a new success action containing the users
                    map(({ data }) => loadOrgUsersSuccess({ users: data.orgUsers })),
                    // Or if there are errors, return a new failure action with the error
                    catchError((error) => of(loadOrgUsersFailure({ error })))
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
            switchMap(({ username, email, password, accessLevel, orgName, userLocation }) =>
                this.userService.addUser(username, email, password, accessLevel, orgName, userLocation).pipe(
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
                });

                // Check if user and user._id are defined before navigating
                if (user && user._id) {
                    this.router.navigate(['one-user', user._id]);
                } else {
                    // Handle the case where user or user._id is undefined
                    console.error('User or user._id is undefined');
                    this.router.navigate(['/'])
                    // You might want to navigate to a default route or handle this case accordingly
                }
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
    );

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
            ofType(editUserSuccess),
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
            ofType(editUserFailure),
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
                    tap(response => console.log('Login response:', response)),
                    map(({ data }) => {
                        const login = data?.login;
                        console.log(login?.user);
                        return loginUserSuccess({ login })
                    }),
                    catchError((error) => of(loginUserFailure({ error })))
                )
            )
        )
    );

    loginUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginUserSuccess),
            map(({ login }) => {
                if (login && login.token && login.user) {
                    const { username, orgName, accessLevel, userLocation } = login.user;

                    this.toastService.show(`Welcome ${username}!`, {
                        classname: 'bg-success text-light',
                        delay: 3000
                    }),

                        this.router.navigate(['/'])
                    console.log('Login User Success dispatching SET AUTH INFO')
                    return setAuthInfo({ username, orgName, accessLevel, userLocation });
                } else {
                    console.log('no login results or user information available.');
                    return clearAuthInfo();
                }
            })
        )
    );



    loginUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginUserFailure),
            map(({ error }) => {
                this.toastService.show(`${error}`, {
                    classname: 'bg-danger text-light',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutUser),
            map(() => clearAuthInfo())
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            switchMap(({ id }) =>
                from(this.userService.deleteUser(id)).pipe(
                    map(({ data }) =>
                        deleteUserSuccess({ user: data?.deleteUser })),

                    catchError((error) => of(deleteUserFailure({ error })))
                )
            )
        )
    );

    deleteUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUserSuccess),
            map(({ user }) => {
                this.toastService.show('User deleted successfully!', { delay: 3000 });
                if (user) {
                    this.store.dispatch(loadLikeOrgs({ orgName: user?.orgName }));

                }
                this.router.navigateByUrl(`/org-results/${user?.orgName}`);
            })
        ),
        { dispatch: false }
    );

    deleteUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUserFailure),
            map(({ error }) => {
                this.toastService.show(`User deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );


}

