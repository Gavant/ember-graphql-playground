import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import SessionService from 'ember-simple-auth/services/session';

import { ServerErrorPayload } from 'ember-graphql-playground';
import LoginRoute, { LoginChangeset } from 'ember-graphql-playground/pods/login/route';
import LoadingBar from 'ember-graphql-playground/services/loading-bar';
import Notification from 'ember-graphql-playground/services/notification';
import { RouteModel } from 'ember-graphql-playground/utils/typescript';

export default class LoginController extends Controller {
    @service declare loadingBar: LoadingBar;
    @service declare notification: Notification;
    @service declare session: SessionService;
    declare model: RouteModel<LoginRoute>;

    /**
     * Authenticate the user
     *
     * @param {LoginChangeset} changeset
     * @return {*}
     * @memberof LoginController
     */
    @action
    async authenticate(changeset: LoginChangeset) {
        const username = changeset.emailAddress;
        const password = changeset.password;

        try {
            this.loadingBar.show();
            this.session.set('isAuthenticating', true);
            const response = await this.session.authenticate('authenticator:oauth2-gavant', username, password);
            return response;
        } catch (err) {
            const response = err as ServerErrorPayload;
            this.loadingBar.hide();
            this.session.set('isAuthenticating', false);

            this.notification.errors(response);
            throw err;
        }
    }

}
declare module '@ember/controller' {
    interface Registry {
        login: LoginController;
    }
}
