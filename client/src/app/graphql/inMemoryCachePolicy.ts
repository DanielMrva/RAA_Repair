import { InMemoryCache } from '@apollo/client/core';

export const cache = new InMemoryCache({
  typePolicies: {
    Organization: {
      keyFields: ['_id'], // Ensures each Organization is uniquely identified.
      fields: {
        tags: {
          // Here, we simply replace the old array with the incoming one.
          // You could also merge them if desired (for example, for pagination).
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Query: {
      fields: {
        orgNames: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        allOrgs: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        allTags: {
            merge(existing = [], incoming) {
                return incoming;
            }
        }
      },
    },
  },
});
