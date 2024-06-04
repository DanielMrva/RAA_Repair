import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as OrgActions from "./org.actions";
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

    on(OrgActions.loadAllOrgs, state => ({ 
        ...state, 
        isLoading: true,
        error: null 
    })),

    on(OrgActions.loadAllOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoading: false,
        error: null
    })),

    on(OrgActions.loadAllOrgsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(OrgActions.loadLikeOrgs, state => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(OrgActions.loadLikeOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoading: false,
        error: null
    })),

    on(OrgActions.loadLikeOrgsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(OrgActions.loadOneOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(OrgActions.loadOneOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null,
    })),

    on(OrgActions.loadOneOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(OrgActions.editOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(OrgActions.editOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null
    })),

    on(OrgActions.editOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(OrgActions.addOrg, (state) => ({
        ...state,
        isLoading: true,
        error: null,

    })),

    on(OrgActions.addOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoading: false,
        error: null,
    })),

    on(OrgActions.addOrgFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(OrgActions.loadOrgNames, state => ({ 
        ...state, 
        isLoading: true, 
        error: null 
    })),

    on(OrgActions.loadOrgNamesSuccess, (state, { organizations }) => ({
        ...state,
        orgNames: organizations as Organization[],
        isLoading: false,
        error: null
    })),

    on(OrgActions.loadOrgNamesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)
