import { createReducer, on } from "@ngrx/store";
import * as TagActions from "./tag.actions";
import { Tag } from "@app/graphql/schemas";

export interface TagState {
    oneTag: Tag | null;
    tags: Tag[];
    error: string | null;
    isLoading: boolean;
};

export const initialState: TagState = {
    oneTag: null,
    tags: [],
    error: null,
    isLoading: false
};

export const tagReducer = createReducer(
    initialState,

    on(TagActions.loadOneTag, (state) => ({
        ...state,
        oneTag: null,
        isLoading: true,
        error: null,
    })),

    on(TagActions.loadOneTagSuccess, (state, action ) => ({
        ...state,
        oneTag: action.tag,
        isLoading: false,
        error: null,
    })),

    on(TagActions.loadOneTagFailure, (state, action) => ({
        ...state,
        oneTag: null,
        isLoading: false,
        error: action.error
    })),

    on(TagActions.loadAllTags, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(TagActions.loadAllTagsSuccess, (state, { tags }) => ({
        ...state,
        tags: tags as Tag[],
        isLoading: false,
        error: null,
    })),

    on(TagActions.loadAllTagsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(TagActions.addTag, (state) => ({
        ...state,
        oneTag: null,
        isLoading: true,
        error: null,
    })),

    on(TagActions.addTagSuccess, (state, { tag }) => ({
        ...state,
        oneTag: tag as Tag,
        isLoading: false,
        error: null,
    })),

    on(TagActions.addTagFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error
    })),

    on(TagActions.editTag, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(TagActions.editTagSuccess, (state, { tag }) => ({
        ...state,
        oneTag: tag as Tag,
        isLoading: false,
        error: null,
    })),

    on(TagActions.editTagFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
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
