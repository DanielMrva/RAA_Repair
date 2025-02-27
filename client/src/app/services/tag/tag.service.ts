import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Tag, UpdateTagFields } from '@app/graphql/schemas';
import { ADD_TAG, EDIT_TAG, DELETE_TAG } from '@app/graphql/schemas';
import { QUERY_LIKE_TAG, QUERY_SINGLE_TAG, ALL_TAGS } from '@app/graphql/schemas';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private apollo: Apollo) { }

  querySingleTag(tagId: string) {
    return this.apollo.watchQuery<{tag: Tag}> ({
      query: QUERY_SINGLE_TAG,
      variables: {
        tagId
      }
    })
  }

  allTags() {
    return this.apollo.watchQuery<{allTags: Tag[]}> ({
      query: ALL_TAGS
    })
  }

  queryLikeTag(tagName: string) {
    return this.apollo.watchQuery<{likeTag: Tag[]}> ({
      query: QUERY_LIKE_TAG,
      variables: {
        tagName
      }
    })
  }

  addTag(tagName: string) {
    return this.apollo.mutate<{addTag: Tag}> ({
      mutation: ADD_TAG,
      variables: { 
        tagName
      }
    })
  }

  editTag(id: string, updates: UpdateTagFields) {
    return this.apollo.mutate<{editTag: Tag}> ({
      mutation: EDIT_TAG,
      variables: {
        id,
        updates
      }
    })
  }

  deleteTag(id: string) {
    return this.apollo.mutate<{deleteTag: Tag}> ({
      mutation: DELETE_TAG,
      variables: {
        id
      }
    })
  }
}
