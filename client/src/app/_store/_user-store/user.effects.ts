import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { 
        loginUser, 
        addUser, 
        loadUsers, 
        loadUsersSucess, 
        loadUsersFailure,
        loadOneUser,
        loadOneUserSucess,
        loadOneUserFailure,
        editUser,
        editUserSucess,
        editUserFailure
    } from "./user.actions";
import { UserService } from "@app/services/users/user.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { selectAllUsers } from "./user.selectors";
import { AppState } from "../app.state";

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
                    map(( {data} ) => loadUsersSucess({ users: data.users})),
                    // Or if there are errors, return a new failure action with the error
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    )
}

