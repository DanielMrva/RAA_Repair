import { createAction, props } from "@ngrx/store";
import { User } from "@app/graphql/schemas/typeInterfaces";

export const loginUser = createAction(
    '[Login Page] Login User',
    props<{ email: string, password: string}>()
);

export const addUser = createAction(
    '[Add User Page] Add User',
    props<{ 
        username: string,
        email: string,
        password: string,
        orgName: string,
        accessLevel?: string
    }>()
);

export const loadUsers = createAction('[User Reports Page] Load Users');

export const loadUsersSucess = createAction(
    '[User Service] Load Users Sucess',
    props<{ users: User[] }>()    
);

export const loadUsersFailure = createAction(
    '[User Service] Load Users Failure',
    props<{ error: string}>()
);

export const loadOneUser = createAction('[User Page] Load One User');

export const loadOneUserSucess = createAction(
    '[User Service] Load One User Sucesss',
    props<{ user: User}>
);

export const loadOneUserFailure = createAction(
    '[User Service] Load One User Failure',
    props<{ error: string}>()
);

export const loadOrgUsers = createAction('[Org User Reports Page] Load Org Users');

export const loadOrgUsersSucess = createAction(
    '[User Service] Load Org Users Sucess',
    props<{ users: User[] }>()    
);

export const loadOrgUsersFailure = createAction(
    '[User Service] Load Org Users Failure',
    props<{ error: string}>()
);

export const editUser = createAction(
    '[Edit User Page] Edit User',
    props<{ id: string,
            username?: string,
            email?: string,
            password?: string,
            orgName?: string,
            accessLevel?: string
    }>
);

export const editUserSucess = createAction(
    '[User Service]',
    props<{ user: User }>()
);

export const editUserFailure = createAction(
    '[User Service]',
    props<{ error: string}>()
);

