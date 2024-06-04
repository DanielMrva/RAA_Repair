import { createAction, props } from "@ngrx/store";
import { Organization, UpdateOrgFields } from "@app/graphql/schemas/typeInterfaces";

export const loadAllOrgs = createAction('[Org Reports Page] Load All Orgs');

export const loadAllOrgsSuccess = createAction(
    '[Org Service] Load All Orgs Success',
    props<{ organizations: Organization[] }>()    
);

export const loadAllOrgsFailure = createAction(
    '[Org Service] Load All Orgs Failure',
    props<{ error: string}>()
);

export const loadLikeOrgs = createAction(
    '[Org Results Page] Load Like Orgs',
    props<{ orgName: string}>()
);

export const loadLikeOrgsSuccess = createAction(
    '[Org Service] Load Like Orgs Success',
    props<{ organizations: Organization[] }>()    
);

export const loadLikeOrgsFailure = createAction(
    '[Org Service] Load All Orgs Failure',
    props<{ error: string}>()
);

export const loadOneOrg = createAction(
    '[Org Page] Load One Org',
    props<{ orgId: string}>()
);

export const loadOneOrgSuccess = createAction(
    '[Org Service] Load One Org Successs',
    props<{ organization: Organization}>()
);

export const loadOneOrgFailure = createAction(
    '[Org Service] Load One Org Failure',
    props<{ error: string}>()
);

export const editOrg = createAction(
    '[Edit Org Page] Edit Org',
    props<{ id: string,
            updates: UpdateOrgFields
    }>()
);

export const editOrgSuccess = createAction(
    '[Org Service] Edit Org Success',
    props<{ organization?: Organization }>()
);

export const editOrgFailure = createAction(
    '[Org Service] Edit Org Failure',
    props<{ error: string}>()
);

export const addOrg = createAction(
    '[Add Org Page] Add Org',
    props<{ 
        orgName: string
    }>()
);

export const addOrgSuccess = createAction(
    '[Org Service] Add Org Success',
    props<{ organization?: Organization}>()
);

export const addOrgFailure = createAction(
    '[Org Service] Add Org Failure',
    props<{ error: string}>()
);

export const loadOrgNames = createAction(
    '[Org Name Dropdown] Load Org Names'
);

export const loadOrgNamesSuccess = createAction(
    '[Org Service] Load Org Names Success',
    props<{ organizations?: Organization[] }>()
);

export const loadOrgNamesFailure = createAction(
    '[Org Service] Load Org Names Failure',
    props<{ error: string }>()
);

