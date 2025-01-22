import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TagState } from "./tag.reducers";

export const selectTags = ( state: AppState ) => state.tag;

export const selectAllTags = createSelector(
    selectTags,
    (state: TagState) => state.tags
);

export const selectOneTag = createSelector(
    selectTags,
    (state: TagState) => state.oneTag
);

export const tagLoadingSelector = createSelector(
    selectTags,
    (state: TagState) => state.isLoading
);

export const tagErrorSelector = createSelector(
    selectTags,
    (state: TagState) => state.error
);