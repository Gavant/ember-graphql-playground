import { gql } from 'glimmer-apollo';

export const STAR_REPO = gql`
    mutation starRepo($input: AddStarInput!) {
        addStar(input: $input) {
            clientMutationId
            starrable {
                stargazers(first: 3) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`;

export const UNSTAR_REPO = gql`
    mutation unstarRepo($input: RemoveStarInput!) {
        removeStar(input: $input) {
            clientMutationId
            starrable {
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
    addStar?: {
        __typename?: 'removeStar';
        clientMutationId: string;
        starrable: {
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
