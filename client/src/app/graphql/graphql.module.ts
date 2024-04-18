import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, from, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { CommonModule } from '@angular/common';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '@environments/environment';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError.message}, ${networkError.name}, ${networkError.stack}`);
});

const uri = `${environment.apiBaseUri}/graphql`;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: from([errorLink, httpLink.create({uri})]),
    cache: new InMemoryCache(),
  };
};

@NgModule({
  exports: [ApolloModule, ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule { }
