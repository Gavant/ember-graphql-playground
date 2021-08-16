import Component from '@glimmer/component';
import { useQuery } from 'glimmer-apollo';

import { GET_USER, GetUserQuery, GetUserQueryVariables } from 'ember-graphql-playground/gql/queries/user';

interface UserWelcomeMsgArgs {}

export default class UserWelcomeMsg extends Component<UserWelcomeMsgArgs> {
    user = useQuery<GetUserQuery, GetUserQueryVariables>(this, () => [
        GET_USER,
        {
            /* options */
        }
    ]);

    get isLoading() {
        return this.user.loading || !this.user.data;
    }
}
