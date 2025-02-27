import { createReducer, on } from "@ngrx/store";
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
    loadOrgUsers,
    loadOrgUsersSuccess,
    loadOrgUsersFailure,
    editUser,
    editUserSuccess,
    editUserFailure,
    deleteUserFailure,
    deleteUserSuccess
} from "./user.actions";
import { User, statusType } from "@app/graphql/schemas";


export interface UserState {
    oneUser: User | null;
    users: User[];
    error: string | null;
    isLoadingOneUser: boolean;
    isLoadingUsers: boolean;
};

export const initialState: UserState = {
    oneUser: null,
    users: [],
    error: null,
    isLoadingOneUser: false,
    isLoadingUsers: false
};

export const userReducer = createReducer(

    initialState,

    on(loginUser, state => ({ ...state, isLoadingOneUser: true, error: null,})),

    on(loginUserSuccess, (state, { login }) => ({
        ...state,
        isLoadingOneUser: false,
        error: null
    })),

    on(loginUserFailure, (state, { error }) => ({
        ...state,
        isLoadingOneUser: false,
        error: error
    })),

    on(addUser, (state) => ({
        ...state,
        isLoadingOneUser: true,
        error: null,

    })),

    on(addUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoadingOneUser: false,
        error: null,
    })),

    on(addUserFailure, (state, { error }) => ({
        ...state,
        isLoadingOneUser: false,
        error: error
    })),

    on(loadUsers, (state) => ({
        ...state,
        isLoadingUsers: true,
        error: null,
    })),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        isLoadingUsers: false,
        error: null,
    })),

    on(loadUsersFailure, (state, { error }) => ({
        ...state,
        isLoadingUsers: false,
        error: error
    })),

    on(loadOneUser, (state) => ({
        ...state,
        isLoadingOneUser: true,
        error: null,

    })),

    on(loadOneUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoadingOneUser: false,
        error: null,
    })),

    on(loadOneUserFailure, (state, { error }) => ({
        ...state,
        isLoadingOneUser: false,
        error: error
    })),

    on(loadOrgUsers, (state) => ({
        ...state,
        isLoadingUsers: true,
        error: null,
    })),

    on(loadOrgUsersSuccess, (state, { users }) => ({
        ...state,
        users: users as User[],
        isLoadingUsers: false,
        error: null,
    })),

    on(loadOrgUsersFailure, (state, { error }) => ({
        ...state,
        isLoadingUsers: false,
        error: error
    })),

    on(editUser, (state) => ({
        ...state,
        isLoadingOneUser: true,
        error: null
    })),

    on(editUserSuccess, (state, { user }) => ({
        ...state,
        oneUser: user as User,
        isLoadingOneUser: false,
        error: null
    })),

    on(editUserFailure, (state, { error }) => ({
        ...state,
        isLoadingOneUser: false,
        error: error
    })),
    
    on(deleteUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.filter(user => user._id !== user._id),
    })),

    on(deleteUserFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)