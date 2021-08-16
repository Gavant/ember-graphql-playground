import { gql } from 'glimmer-apollo';

export const GET_ORG_REPOS = gql`
    query GetOrgRepos($queryString: String!) {
        search(query: $queryString, type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        stargazerCount
                        viewerHasStarred
                        url
                        shortDescriptionHTML
                    }
                }
            }
        }
    }
`;

export type RepoFragment = {
    id: string;
    name: string;
    stargazerCount: number;
    viewerHasStarred: boolean;
    __typename?: 'Repository';
};

export type GetOrgReposQuery = {
    __typename?: 'Query';
    search: {
        __typename?: 'SearchResultItemConnection';
        repositoryCount: number;
        edges: {
            node: RepoFragment;
        }[];
    };
};

export type GetOrgReposQueryVariables = {
    queryString: string;
};
