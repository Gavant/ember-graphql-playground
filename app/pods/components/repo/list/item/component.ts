import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
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
    onToggleStar?: () => void;
}

export default class RepoListItem extends Component<RepoListItemArgs> {
    addStar = useMutation<StarRepoMutation, StarRepoMutationVariables>(this, () => [STAR_REPO, {}]);
    removeStar = useMutation<UnstarRepoMutation, StarRepoMutationVariables>(this, () => [UNSTAR_REPO, {}]);

    // patterns like this would probably be more common than they are in ember-data controlled list views
    // as since the query for the list of the data is different and separate from the query/mutation that
    // updates an individual item in the list, mutating in an item will not cause that item in the cached
    // list of items to automatically update. We could alternatively just trigger a refetch of the entire
    // list after an update, but that is inefficient, and could lead to other issues w/pagination, etc.
    @tracked isStarred = this.args.repo.viewerHasStarred;
    @tracked starCount = this.args.repo.stargazerCount;

    get isLoading() {
        return this.addStar.loading || this.removeStar.loading || this.args.isListLoading;
    }

    @action
    async toggleStar(repo: RepoFragment) {
        if (this.isLoading) {
            return;
        }

        let result;

        if (this.isStarred) {
            result = (await this.removeStar.mutate({ input: { starrableId: repo.id } })) as UnstarRepoMutation;
            this.starCount = result.removeStar?.starrable.stargazerCount ?? 0;
        } else {
            result = (await this.addStar.mutate({ input: { starrableId: repo.id } })) as StarRepoMutation;
            this.starCount = result.addStar?.starrable.stargazerCount ?? 0;
        }

        this.isStarred = !this.isStarred;
        return this.args.onToggleStar?.();
    }
}
