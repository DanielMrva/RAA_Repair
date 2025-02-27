import { createReducer, on } from "@ngrx/store";
import * as TagActions from "./tag.actions";
import { Tag } from "@app/graphql/schemas";

export interface TagState {
    oneTag: Tag | null;
    tags: Tag[];
    error: string | null;
    isLoadingOneTag: boolean;
    isLoadingTags: boolean;
};

export const initialState: TagState = {
    oneTag: null,
    tags: [],
    error: null,
    isLoadingOneTag: false,
    isLoadingTags: false,
};

export const tagReducer = createReducer(
    initialState,

    on(TagActions.loadOneTag, (state) => ({
        ...state,
        oneTag: null,
        isLoadingOneTag: true,
        error: null,
    })),

    on(TagActions.loadOneTagSuccess, (state, action ) => ({
        ...state,
        oneTag: action.tag,
        isLoadingOneTag: false,
        error: null,
    })),

    on(TagActions.loadOneTagFailure, (state, action) => ({
        ...state,
        oneTag: null,
        isLoadingOneTag: false,
        error: action.error
    })),

    on(TagActions.loadAllTags, (state) => ({
        ...state,
        isLoadingTags: true,
        error: null,
    })),

    on(TagActions.loadAllTagsSuccess, (state, { tags }) => ({
        ...state,
        tags: tags as Tag[],
        isLoadingTags: false,
        error: null,
    })),

    on(TagActions.loadAllTagsFailure, (state, { error }) => ({
        ...state,
        isLoadingTags: false,
        error: error
    })),

    on(TagActions.addTag, (state) => ({
        ...state,
        oneTag: null,
        isLoadingOneTag: true,
        error: null,
    })),

    on(TagActions.addTagSuccess, (state, { tag }) => ({
        ...state,
        oneTag: tag as Tag,
        isLoadingOneTag: false,
        error: null,
    })),

    on(TagActions.addTagFailure, (state, { error }) => ({
        ...state,
        isLoadingOneTag: false,
        error: error
    })),

    on(TagActions.editTag, (state) => ({
        ...state,
        isLoadingOneTag: true,
        error: null,
    })),

    on(TagActions.editTagSuccess, (state, { tag }) => ({
        ...state,
        oneTag: tag as Tag,
        isLoadingOneTag: false,
        error: null,
    })),

    on(TagActions.editTagFailure, (state, { error }) => ({
        ...state,
        isLoadingOneTag: false,
        error: error
    })),

    on(TagActions.deleteTagSuccess, (state, { tag }) => ({
        ...state,
        tags: state.tags.filter(tag => tag._id !== tag._id),
    })),

    on(TagActions.deleteTagFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
)
