import { gql } from 'glimmer-apollo';

export const STAR_REPO_GQL = gql`
    mutation starRepo($input: AddStarInput!) {
        addStar(input: $input) {
            clientMutationId
            starrable {
                stargazerCount
                viewerHasStarred
                stargazers(first: 3) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`;

export const UNSTAR_REPO_GQL = gql`
    mutation unstarRepo($input: RemoveStarInput!) {
        removeStar(input: $input) {
            clientMutationId
            starrable {
                stargazerCount
                viewerHasStarred
                stargazers(first: 3) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`;

export type StarRepoMutation = {
    __typename?: 'Mutation';
    addStar?: {
        __typename?: 'addStar';
        clientMutationId: string;
        starrable: {
            stargazerCount: number;
            viewerHasStarred: boolean;
            stargazers: {
                nodes: {
                    __typename?: 'User';
                    name: string;
                }[];
            };
        };
    };
};

export type UnstarRepoMutation = {
    __typename?: 'Mutation';
    removeStar?: {
        __typename?: 'removeStar';
        clientMutationId: string;
        starrable: {
            stargazerCount: number;
            viewerHasStarred: boolean;
            stargazers: {
                nodes: {
                    __typename?: 'User';
                    name: string;
                }[];
            };
        };
    };
};

export type StarRepoMutationVariables = {
    input: {
        starrableId: string;
    };
};
