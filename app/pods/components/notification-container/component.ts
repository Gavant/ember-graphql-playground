import { inject as service } from '@ember/service';

import OriginalNotificationContainer from 'ember-cli-notifications/components/notification-container';

import Notification from 'ember-graphql-playground/services/notification';

export default class NotificationContainer extends OriginalNotificationContainer {
    @service('notification') declare notifications: Notification;
}
