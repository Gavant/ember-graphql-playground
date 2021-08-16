import Component from '@glimmer/component';
import { useQuery } from 'glimmer-apollo';
import { NetworkStatus } from '@apollo/client/core';

import { GET_ORG_REPOS, GetOrgReposQuery, GetOrgReposQueryVariables } from 'ember-graphql-playground/gql/queries/repo';

interface RepoListArgs {
    org: string;
}

export default class RepoList extends Component<RepoListArgs> {
    repos = useQuery<GetOrgReposQuery, GetOrgReposQueryVariables>(this, () => [
        GET_ORG_REPOS,
        {
            variables: {
                queryString: this.queryString
            },

            // other options: https://glimmer-apollo.com/docs/fetching/queries#options

            // disables the query from being run in FastBoot
            ssr: false

            // uncomment this to tell graphql to return any data along with errors when they occur
            // so that you can possibly get partial results. default is 'none', where no data is returned
            // and can also be set to 'ignore' to omit any errors and return any data that was fetched
            // errorPolicy: 'all',

            // uncomment this to always force a network request, default is 'cache-first'
            // there are a few other policies available as well
            // fetchPolicy: 'network-only'
        }
    ]);

    get queryString() {
        return `org:${this.args.org}`;
    }

    get notReady() {
        return this.repos.networkStatus === NetworkStatus.refetch || this.repos.networkStatus === NetworkStatus.loading;
    }
}
