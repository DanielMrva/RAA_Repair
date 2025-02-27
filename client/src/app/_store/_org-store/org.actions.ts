import { createAction, props } from "@ngrx/store";
import { Organization, OrgFilter, UpdateOrgFields } from "@app/graphql/schemas/typeInterfaces";

export const loadAllOrgs = createAction('[Org Reports Page] Load All Orgs');

export const loadAllOrgsSuccess = createAction(
    '[Org Service] Load All Orgs Success',
    props<{ organizations: Organization[] }>()
);

export const loadAllOrgsFailure = createAction(
    '[Org Service] Load All Orgs Failure',
    props<{ error: string }>()
);

export const loadLikeOrgs = createAction(
    '[Org Results Page] Load Like Orgs',
    props<{ orgName: string }>()
);

export const loadLikeOrgsSuccess = createAction(
    '[Org Service] Load Like Orgs Success',
    props<{ organizations: Organization[] }>()
);

export const loadLikeOrgsFailure = createAction(
    '[Org Service] Load All Orgs Failure',
    props<{ error: string }>()
);

export const loadOneOrg = createAction(
    '[Org Page] Load One Org',
    props<{ orgId: string }>()
);

export const loadOneOrgSuccess = createAction(
    '[Org Service] Load One Org Successs',
    props<{ organization: Organization }>()
);

export const loadOneOrgFailure = createAction(
    '[Org Service] Load One Org Failure',
    props<{ error: string }>()
);

export const editOrg = createAction(
    '[Edit Org Page] Edit Org',
    props<{
        id: string,
        updates: UpdateOrgFields
    }>()
);

export const editOrgSuccess = createAction(
    '[Org Service] Edit Org Success',
    props<{ organization?: Organization }>()
);

export const editOrgFailure = createAction(
    '[Org Service] Edit Org Failure',
    props<{ error: string }>()
);

export const addOrg = createAction(
    '[Add Org Page] Add Org',
    props<{
        orgName: string,
        tags: string[]
    }>()
);

export const addOrgSuccess = createAction(
    '[Org Service] Add Org Success',
    props<{ organization?: Organization }>()
);

export const addOrgFailure = createAction(
    '[Org Service] Add Org Failure',
    props<{ error: string }>()
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

export const deleteOrganization = createAction(
    '[Organization] Delete Organization',
    props<{ id: string }>()
);

export const deleteOrganizationSuccess = createAction(
    '[Organization] Delete Organization Success',
    props<{ organization?: Organization }>()
);

export const deleteOrganizationFailure = createAction(
    '[Organization] Delete Organization Failure',
    props<{ error: any }>()
);

export const loadOrgsByTag = createAction(
    '[Org Service] Load Orgs By Tags',
    props<{ tagIds: string[] }>()
);

export const loadOrgsByTagSuccess = createAction(
    '[Org Service] Load Orgs By Tag Success',
    props<{ organizations?: Organization[] }>()
);

export const loadOrgsByTagFailure = createAction(
    '[Org Service] Load Org By Tag Failure',
    props<{ error: string }>()
);

export const loadOrgsByLikeTag = createAction(
    '[Org Service] Load Orgs By Like Tags',
    props<{ tagNames: string[] }>()
);

export const loadOrgsByLikeTagSuccess = createAction(
    '[Org Service] Load Orgs By Like Tag Success',
    props<{ organizations?: Organization[] }>()
);

export const loadOrgsByLikeTagFailure = createAction(
    '[Org Service] Load Org By Like Tag Failure',
    props<{ error: string }>()
);

export const loadOrgsWithFilter = createAction(
    '[Org] Load Orgs With Filter',
    props<{ filter: OrgFilter }>()
);

