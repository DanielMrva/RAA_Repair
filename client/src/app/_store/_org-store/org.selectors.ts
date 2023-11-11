import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { OrgState } from "./org.reducers";

export const selectOrgs = ( state: AppState ) => state.org;

export const selectAllOrgs = createSelector(
    selectOrgs,
    ( state: OrgState) => state.organizations
);

export const selectOneOrg = createSelector(
    selectOrgs,
    (state: OrgState) => state.oneOrganization
);

export const selectOrgNames = createSelector(
    selectOrgs,
    (state: OrgState) => state.orgNames
);

export const orgLoadingSelector = createSelector(
    selectOrgs,
    (state: OrgState) => state.isLoading
)

export const orgErrorSelector = createSelector(
    selectOrgs,
    (state: OrgState) => state.error
);