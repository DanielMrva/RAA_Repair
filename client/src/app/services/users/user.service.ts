import { Injectable } from '@angular/core';
import { Apollo, QueryRef, MutationResult } from 'apollo-angular';
import { ADD_USER, EDIT_USER, LOGIN_USER } from '@app/graphql/schemas/mutations';
import { Auth, LoginResults, UpdateUserFields, User } from '@app/graphql/schemas/typeInterfaces';
import { ORG_USERS, QUERY_SINGLEUSER, QUERY_USERS } from '@app/graphql/schemas/queries';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  addUser(username: string, email: string, password: string, orgName: string, accessLevel: string) {
    return this.apollo.mutate<{addUser: Auth}>({
      mutation: ADD_USER, 
      variables: {
        username,
        email,
        password,
        orgName,
        accessLevel
      }
    });
  }

  loginUser(email: string, password: string) {

    console.log(`Login User in Service: ${email}, ${password}`)
    return this.apollo.mutate<{login: LoginResults}>({
      mutation: LOGIN_USER,
      variables: {
        email,
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
    return this.apollo.watchQuery<{users: User[]}> ({
      query: QUERY_USERS
    })
  }

  queryOrgUsers(orgName: string) {
    return this.apollo.watchQuery<{orgUsers: User[]}> ({
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
