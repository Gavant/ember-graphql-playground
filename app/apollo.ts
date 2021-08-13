import { setClient } from 'glimmer-apollo';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

import ENV from 'ember-graphql-playground/config/environment';

export default function setupApolloClient(context: Record<string, unknown>): void {
    // HTTP connection to the API
    const httpLink = createHttpLink({
        uri: ENV.graphqlApiUrl
    });

    // Cache implementation
    const cache = new InMemoryCache();

    // Create the apollo client
    const apolloClient = new ApolloClient({
        link: httpLink,
        cache
    });

    // Set default apollo client for Glimmer Apollo
    setClient(context, apolloClient);
}
