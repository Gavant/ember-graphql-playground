import { set } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { User } from '../../types/ember-graphql-playground/user';

import SessionService from 'ember-simple-auth/services/session';

import { reject } from 'rsvp';

export default class CurrentUserService extends Service {
    @service declare session: SessionService;

    @tracked user?: User;

    /**
     * Loads the current user from the API
     * @return Promise<User>
     */
    load(): Promise<User> {
        return this.fetchUser();
    }

    /**
     * Refreshes the current user if logged in
     * @return {Promise}
     */
    refresh(): Promise<User> {
        //only attempt to refresh the user if there is a logged in user
        if (this.session.isAuthenticated) {
            return this.fetchUser();
        }
        return reject();
    }

    /**
     * Fetches the current user model
     * @returns Promise<User>
     */
    async fetchUser(): Promise<User> {
        //TODO implement in graphql
        const user = { id: 1234, firstName: 'Bill', lastName: 'D' };
        set(this.session, 'user', user);
        this.user = user;
        return user;
    }
}
