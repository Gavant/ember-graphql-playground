import Component from '@glimmer/component';
import { action } from '@ember/object';
import { useMutation } from 'glimmer-apollo';

import { RepoFragment } from 'ember-graphql-playground/gql/queries/repo';
import {
    StarRepoMutation,
    UnstarRepoMutation,
    StarRepoMutationVariables,
    STAR_REPO,
    UNSTAR_REPO
} from 'ember-graphql-playground/gql/mutations/repo';

interface RepoListItemArgs {
    repo: RepoFragment;
    isListLoading: boolean;
    onToggleStar: () => void;
}

export default class RepoListItem extends Component<RepoListItemArgs> {
    addStar = useMutation<StarRepoMutation, StarRepoMutationVariables>(this, () => [STAR_REPO, {}]);
    removeStar = useMutation<UnstarRepoMutation, StarRepoMutationVariables>(this, () => [UNSTAR_REPO, {}]);

    get isLoading() {
        return this.addStar.loading || this.removeStar.loading || this.args.isListLoading;
    }

    @action
    async toggleStar(repo: RepoFragment) {
        if (this.isLoading) {
            return;
        }

        if (repo.viewerHasStarred) {
            await this.removeStar.mutate({ input: { starrableId: repo.id } });
        } else {
            await this.addStar.mutate({ input: { starrableId: repo.id } });
        }

        return this.args.onToggleStar();
    }
}
