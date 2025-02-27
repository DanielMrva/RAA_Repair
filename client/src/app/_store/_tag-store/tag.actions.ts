import { createAction, props } from "@ngrx/store";
import { Tag, UpdateTagFields} from "@app/graphql/schemas";

export const loadOneTag = createAction(
    '[Tag Page] Load One Tag',
    props<{ tagId: string}>()
);

export const loadOneTagSuccess = createAction(
    '[Tag Service] Load One Tag Successs',
    props<{ tag: Tag}>()
);

export const loadOneTagFailure = createAction(
    '[Tag Service] Load One Tag Failure',
    props<{ error: string}>()
);

export const loadAllTags = createAction('[Tag Reports Page] Load All Tags');

export const loadAllTagsSuccess = createAction(
    '[Tag Service] Load All Tags Success',
    props<{ tags: Tag[] }>()    
);

export const loadAllTagsFailure = createAction(
    '[Tag Service] Load All Tags Failure',
    props<{ error: string}>()
);

export const loadTagByName = createAction(
    '[Tag Page] Load Tag By Tag Number, Tag Name',
    props<{ tagNumber: string, tagDescription: string }>()
);

export const loadTagByNameSuccess = createAction(
    '[Tag Service] Load Tag By Tag Number, Tag Name Success',
    props<{ tagByNumDesc: Tag[] }>()
);

export const loadTagByNameFailure = createAction(
    '[Tag Service] Load Tag By Tag Number, Tag Name',
    props<{ error: string }>()
);

export const addTag = createAction(
    '[Add Tag Page] Add Tag',
    props<{ tagName: string  }>()
);

export const addTagSuccess = createAction(
    '[Tag Service] Add Tag Success',
    props<{ tag?: Tag}>()
);

export const addTagFailure = createAction(
    '[Tag Service] Add Tag Failure',
    props<{ error: string}>()
);

export const editTag = createAction(
    '[Edit Tag Page] Edit Tag',
    props<{ id: string,
            updates: UpdateTagFields
    }>()
);

export const editTagSuccess = createAction(
    '[Tag Service] Edit Tag Success',
    props<{ tag?: Tag }>()
);

export const editTagFailure = createAction(
    '[Tag Service] Edit Tag Failure',
    props<{ error: string}>()
);

export const deleteTag = createAction(
    '[Tag] Delete Tag',
    props<{ id: string }>()
);

export const deleteTagSuccess = createAction(
    '[Tag] Delete Tag Success',
    props<{ tag?: Tag }>()
);

export const deleteTagFailure = createAction(
    '[Tag] Delete Tag Failure',
    props<{ error: any }>()
);