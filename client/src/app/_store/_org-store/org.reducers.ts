import { createReducer, on } from "@ngrx/store";
// imports of actions
import { Organization } from "@app/graphql/schemas";

export interface OrgState {
    oneOrganization: Organization | null;
    Organizations: Organization[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: OrgState = {
    oneOrganization: null,
    Organizations: [],
    error: null,
    status: 'pending'
}
