import { setClient } from 'glimmer-apollo';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import fetch from 'fetch';

import ENV from 'ember-graphql-playground/config/environment';

export default function setupApolloClient(context: Record<string, unknown>): void {
    // HTTP connection to the API
    const httpLink = createHttpLink({
        uri: ENV.graphqlApiUrl,
        headers: {
            Authorization: `bearer ${ENV.graphqlToken}`
        },
        fetch
    });

    // Cache implementation
    const cache = new InMemoryCache({
        // define policies on how query results should be stored in the cache
        // particularly to enable things like pagination logic, as by default
        // queries will be cached separately if their args/variables are different
        // @see https://www.apollographql.com/docs/react/pagination/core-api/#defining-a-field-policy
        typePolicies: {
            Query: {
                fields: {
                    search: {
                        // only 'query' and 'type' arg variables should cause results to be cached separately
                        keyArgs: ['query', 'type'],
                        // concats the incoming list items with the existing list items
                        merge(existing = { edges: [] }, incoming) {
                            // TODO this is a really naive merge function as it assumes new requests
                            // will always come in the correct order, requests will not be repeated, etc
                            // in this case, we should use the request args' `afterId` cursor value
                            // to make sure incoming data is put in the correct spot, etc
                            return {
                                ...existing,
                                ...incoming,
                                edges: [...existing.edges, ...incoming.edges]
                            };
                        }
                    }
                }
            }
        }
    });

    // Create the apollo client
    const apolloClient = new ApolloClient({
        link: httpLink,
        cache
    });

    // Set default apollo client for Glimmer Apollo
    setClient(context, apolloClient);
}
