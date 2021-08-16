import { gql } from 'glimmer-apollo';

export const GET_ORG_REPOS = gql`
    query GetOrgRepos($queryString: String!, $afterId: String, $beforeId: String) {
        search(query: $queryString, after: $afterId, before: $beforeId, type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
                cursor
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
            __typename?: 'SearchResultItemEdge';
            cursor?: string;
            node: RepoFragment;
        }[];
    };
};

export type GetOrgReposQueryVariables = {
    queryString: string;
    afterId?: string;
    beforeId?: string;
};
