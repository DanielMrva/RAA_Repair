import { Injectable } from '@angular/core';
import { Apollo, QueryRef, MutationResult } from 'apollo-angular';
import { ADD_USER, LOGIN_USER } from '@app/graphql/schemas/mutations';

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
}
