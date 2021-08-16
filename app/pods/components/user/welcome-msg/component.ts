import Component from '@glimmer/component';
import { useQuery } from 'glimmer-apollo';

import { GET_USER_GQL, GetUserQuery, GetUserQueryVariables } from 'ember-graphql-playground/gql/queries/user';

interface UserWelcomeMsgArgs {}

export default class UserWelcomeMsg extends Component<UserWelcomeMsgArgs> {
    user = useQuery<GetUserQuery, GetUserQueryVariables>(this, () => [
        GET_USER_GQL,
        {
            /* options */
        }
    ]);

    get isLoading() {
        return this.user.loading || !this.user.data;
    }
}
