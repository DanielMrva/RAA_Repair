import { createAction, props } from "@ngrx/store";
import { LoginResults, UpdateUserFields, User } from "@app/graphql/schemas/typeInterfaces";

export const loginUser = createAction(
    '[Login Page] Login User',
    props<{ email: string, password: string}>()
);

export const loginUserSuccess = createAction(
    '[User Service] Login User Success',
    props<{ login?: LoginResults}>()
);

export const loginUserFailure = createAction(
    '[User Service] Login User Failure',
    props<{error: string}>()
);

export const logoutUser = createAction(
    '[Logout Button] Logout User'
);

export const addUser = createAction(
    '[Add User Page] Add User',
    props<{ 
        username: string,
        email: string,
        password: string,
        accessLevel: string,
        orgName: string,
        userLocation: string,
    }>()
);

export const addUserSuccess = createAction(
    '[User Service] Add User Success',
    props<{ user?: User}>()
);

export const addUserFailure = createAction(
    '[User Service] Add User Failure',
    props<{ error: string}>()
);

export const loadUsers = createAction('[User Reports Page] Load Users');

export const loadUsersSuccess = createAction(
    '[User Service] Load Users Success',
    props<{ users: User[] }>()    
);

export const loadUsersFailure = createAction(
    '[User Service] Load Users Failure',
    props<{ error: string}>()
);

export const loadOneUser = createAction(
    '[User Page] Load One User',
    props<{ userId: string}>()
);

export const loadOneUserSuccess = createAction(
    '[User Service] Load One User Successs',
    props<{ user: User}>()
);

export const loadOneUserFailure = createAction(
    '[User Service] Load One User Failure',
    props<{ error: string}>()
);

export const loadOrgUsers = createAction(
    '[Org User Reports Page] Load Org Users',
    props<{orgName: string}>()
);

export const loadOrgUsersSuccess = createAction(
    '[User Service] Load Org Users Success',
    props<{ users: User[] }>()    
);

export const loadOrgUsersFailure = createAction(
    '[User Service] Load Org Users Failure',
    props<{ error: string}>()
);

export const editUser = createAction(
    '[Edit User Page] Edit User',
    props<{ id: string,
            updates: UpdateUserFields
    }>()
);

export const editUserSuccess = createAction(
    '[User Service] Edit User Success',
    props<{ user?: User }>()
);

export const editUserFailure = createAction(
    '[User Service] Edit User Failure',
    props<{ error: string}>()
);

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ user?: User }>()
);

export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: any }>()
);

