import { createReducer, on } from "@ngrx/store";
// imports of actions
import * as OrgActions from "./org.actions";
import { Organization, statusType } from "@app/graphql/schemas";

export interface OrgState {
    oneOrganization: Organization | null;
    organizations: Organization[];
    orgNames: Organization[];
    error: string | null;
    isLoadingOneOrg: boolean;
    isLoadingOrgs: boolean;
    isLoadingOrgNames: boolean;
};

export const initialState: OrgState = {
    oneOrganization: null,
    organizations: [],
    orgNames: [],
    error: null,
    isLoadingOneOrg: false,
    isLoadingOrgs: false,
    isLoadingOrgNames: false,
}

export const orgReducer = createReducer(

    initialState,

    on(OrgActions.loadAllOrgs, state => ({ 
        ...state, 
        isLoadingOrgs: true,
        error: null 
    })),

    on(OrgActions.loadAllOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoadingOrgs: false,
        error: null
    })),

    on(OrgActions.loadAllOrgsFailure, (state, { error }) => ({
        ...state,
        isLoadingOrgs: false,
        error: error
    })),

    on(OrgActions.loadLikeOrgs, state => ({
        ...state,
        isLoadingOrgs: true,
        error: null
    })),

    on(OrgActions.loadLikeOrgsSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoadingOrgs: false,
        error: null
    })),

    on(OrgActions.loadLikeOrgsFailure, (state, { error }) => ({
        ...state,
        isLoadingOrgs: false,
        error: error
    })),

    on(OrgActions.loadOrgsByTag, state => ({
        ...state,
        isLoadingOrgs: true,
        error: null
    })),

    on(OrgActions.loadOrgsByTagSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoadingOrgs: false,
        error: null
    })),

    on(OrgActions.loadOrgsByTagFailure, (state, { error }) => ({
        ...state,
        isLoadingOrgs: false,
        error: error
    })),

    on(OrgActions.loadOrgsByLikeTag, state => ({
        ...state,
        isLoadingOrgs: true,
        error: null
    })),

    on(OrgActions.loadOrgsByLikeTagSuccess, (state, { organizations }) => ({
        ...state,
        organizations: organizations as Organization[],
        isLoadingOrgs: false,
        error: null
    })),

    on(OrgActions.loadOrgsByLikeTagFailure, (state, { error }) => ({
        ...state,
        isLoadingOrgs: false,
        error: error
    })),

    on(OrgActions.loadOneOrg, (state) => ({
        ...state,
        isLoadingOneOrg: true,
        error: null,

    })),

    on(OrgActions.loadOneOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoadingOneOrg: false,
        error: null,
    })),

    on(OrgActions.loadOneOrgFailure, (state, { error }) => ({
        ...state,
        isLoadingOneOrg: false,
        error: error
    })),

    on(OrgActions.editOrg, (state) => ({
        ...state,
        isLoadingOneOrg: true,
        error: null
    })),

    on(OrgActions.editOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoadingOneOrg: false,
        error: null
    })),

    on(OrgActions.editOrgFailure, (state, { error }) => ({
        ...state,
        isLoadingOneOrg: false,
        error: error
    })),

    on(OrgActions.addOrg, (state) => ({
        ...state,
        isLoadingOneOrg: true,
        error: null,

    })),

    on(OrgActions.addOrgSuccess, (state, { organization }) => ({
        ...state,
        oneOrganization: organization as Organization,
        isLoadingOneOrg: false,
        error: null,
    })),

    on(OrgActions.addOrgFailure, (state, { error }) => ({
        ...state,
        isLoadingOneOrg: false,
        error: error
    })),

    on(OrgActions.loadOrgNames, state => ({ 
        ...state, 
        isLoadingOrgNames: true, 
        error: null 
    })),

    on(OrgActions.loadOrgNamesSuccess, (state, { organizations }) => ({
        ...state,
        orgNames: organizations as Organization[],
        isLoadingOrgNames: false,
        error: null
    })),

    on(OrgActions.loadOrgNamesFailure, (state, { error }) => ({
        ...state,
        isLoadingOrgNames: false,
        error: error
    })),

    on(OrgActions.deleteOrganizationSuccess, (state, { organization }) => ({
        ...state,
        organizations: state.organizations.filter(organization => organization._id !== organization._id),
    })),

    on(OrgActions.deleteOrganizationFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
