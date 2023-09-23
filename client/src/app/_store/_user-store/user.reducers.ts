import { createReducer, on } from "@ngrx/store";
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
import { User } from "@app/graphql/schemas";

export interface UserState {
    oneUser: User | null;
    users: User[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'sucess';
};

export const initialState: UserState = {
    oneUser: null,
    users: [],
    error: null,
    status: 'pending'
}