import { createReducer, on } from "@ngrx/store";
// imports of actions
import {
    loadAllOrgs,
    loadAllOrgsSuccess,
    loadAllOrgsFailure,
    loadOneOrg,
    loadOneOrgSuccess,
    loadOneOrgFailure,
    editOrg,
    editOrgSuccess,
    editOrgFailure,
    addOrg,
    addOrgSuccess,
    addOrgFailure,
    loadOrgNames,
    loadOrgNamesSuccess,
    loadOrgNamesFailure
} from "./org.actions";
import { Organization, statusType } from "@app/graphql/schemas";

export interface OrgState {
    oneOrganization: Organization | null;
    organizations: Organization[];
    orgNames: Organization[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: OrgState = {
    oneOrganization: null,
    organizations: [],
    orgNames: [],
    error: null,
    isLoading: false,
}

export const orgReducer = createReducer(

    initialState,

    on(loadAllOrgs, state => ({ 
        ...state, 
        isLoading: true,
        error: null 
    })),

    on(loadAllOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoading: false,
        error: null
    })),

    on(loadAllOrgsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(loadOneOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(loadOneOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null,
    })),

    on(loadOneOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(editOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(editOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null
    })),

    on(editOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(addOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(addOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null,
    })),

    on(addOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(loadOrgNames, state => ({ 
        ...state, 
        isLoading: true, 
        error: null 
    })),

    on(loadOrgNamesSuccess, (state, { organizations }) => ({
        ...state,
        orgNames: organizations as Organization[],
        isLoading: false,
        error: null
    })),

    on(loadOrgNamesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)
