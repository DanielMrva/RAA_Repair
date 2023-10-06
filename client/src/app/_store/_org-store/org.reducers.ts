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
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: OrgState = {
    oneOrganization: null,
    organizations: [],
    orgNames: [],
    error: null,
    status: 'pending'
}

export const orgReducer = createReducer(

    initialState,

    on(loadAllOrgs, state => ({ ...state, status: 'pending' as statusType, error: null })),

    on(loadAllOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        status: "success" as statusType,
        error: null
    })),

    on(loadAllOrgsFailure, (state, { error }) => ({
        ...state,
        status: "error" as statusType,
        error: error
    })),

    on(loadOneOrg, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,

    })),

    on(loadOneOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        status: 'success' as statusType,
        error: null,
    })),

    on(loadOneOrgFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(editOrg, (state) => ({
        ...state,
        status: 'loading' as statusType,
        error: null
    })),

    on(editOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        status: 'success' as statusType,
        error: null
    })),

    on(editOrgFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(addOrg, (state) => ({
        ...state,
        status: "loading" as statusType,
        error: null,

    })),

    on(addOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        status: 'success' as statusType,
        error: null,
    })),

    on(addOrgFailure, (state, { error }) => ({
        ...state,
        status: 'error' as statusType,
        error: error
    })),

    on(loadOrgNames, state => ({ ...state, status: 'pending' as statusType, error: null })),

    on(loadOrgNamesSuccess, (state, { organizations }) => ({
        ...state,
        orgNames: organizations as Organization[],
        status: "success" as statusType,
        error: null
    })),

    on(loadOrgNamesFailure, (state, { error }) => ({
        ...state,
        status: "error" as statusType,
        error: error
    })),
)
