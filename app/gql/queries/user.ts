import { gql } from 'glimmer-apollo';

export const GET_USER_GQL = gql`
    query GetUser {
        viewer {
            login
        }
    }
`;

export type GetUserQuery = {
    __typename?: 'Query';
    viewer: {
        __typename?: 'Viewer';
        login: string;
    };
};

export type GetUserQueryVariables = {
    foo: string;
};
