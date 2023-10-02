import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { 
        loginUser,
        loginUserSuccess,
        loginUserFailure,
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
import { UserService } from "@app/services/users/user.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, exhaustMap } from "rxjs/operators";
import { Store, createAction } from "@ngrx/store";
import { selectAllUsers } from "./user.selectors";
import { AppState } from "../app.state";
import { create } from "domain";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private userService: UserService
    ) {}
    
    // This runs when loadUsers action is dispactched
    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() => 
                // call 
                from(this.userService.queryUsers()).pipe(
                    // Take the returned data from ApolloQueryResult and return a new success action containing the users
                    map(( {data} ) => loadUsersSuccess({ users: data.users})),
                    // Or if there are errors, return a new failure action with the error
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );

    loadOneUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadOneUser),
            switchMap(( { userId } ) => 
                from(this.userService.querySingleUser(userId)).pipe(
                    map(( {data} ) => loadOneUserSuccess( {user: data.user})),
                    catchError((error) => of(loadOneUserFailure({ error })))
                )
            )
        )
    );

    addUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addUser),
            switchMap(( { username, email, password, orgName} ) =>
                this.userService.addUser(username, email, password, orgName).pipe(
                    map(( { data }) => addUserSuccess({ user: data?.addUser})),
                    catchError((error) => of(addUserFailure({ error })))
                    
                    
                )
            )
        )
    );

    editUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(editUser),
            switchMap(( { id, updates }) => 
                this.userService.editUser(id, updates).pipe(
                    map(( { data }) => editUserSuccess({ user: data?.editUser})),
                    catchError((error) => of(editUserFailure({ error })))
                )
            )
        )
    );

    loginUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginUser),
            switchMap(( { email, password}) => 
                this.userService.loginUser( email, password).pipe(
                    map(( { data } ) => loginUserSuccess({ loginResults: data?.loginUser})),
                    catchError((error) => of(loginUserFailure({ error})))
                )
            )
        )
    );

}

