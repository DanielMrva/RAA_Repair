import { Injectable } from '@angular/core';
import { Apollo, QueryRef, MutationResult } from 'apollo-angular';
import { ADD_USER, EDIT_USER, LOGIN_USER } from '@app/graphql/schemas/mutations';
import { UpdateUserFields, User } from '@app/graphql/schemas/typeInterfaces';
import { ORG_USERS, QUERY_SINGLEUSER, QUERY_USERS } from '@app/graphql/schemas/queries';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  addUser(username: string, email: string, password: string, orgName: string) {
    return this.apollo.mutate({
      mutation: ADD_USER, 
      variables: {
        username,
        email,
        password,
        orgName
      }
    });
  }

  loginUser(username: string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        username,
        password
      }
    });
  }

  querySingleUser(userId: string) {
    return this.apollo.query<{user: User}> ({
      query: QUERY_SINGLEUSER,
      variables: {
        userId
      }
    })
  }

  queryUsers() {
    return this.apollo.query<{users: User[]}> ({
      query: QUERY_USERS
    })
  }

  queryOrgUsers(orgName: string) {
    return this.apollo.query<{orgUsers: User[]}> ({
      query: ORG_USERS,
      variables: {
        orgName
      }
    })
  }

  editUser(id: string, updates: UpdateUserFields) {
    return this.apollo.mutate<{editUser: User}> ({
      mutation: EDIT_USER,
      variables: {id, updates}
    })
  }
}
