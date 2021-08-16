import { setupTest } from 'ember-qunit';

import LoadingBar from 'ember-graphql-playground/services/loading-bar';
import { module, test } from 'qunit';

module('Unit | Service | loading-bar', function (hooks) {
    setupTest(hooks);

    test('Show/Hide work', function (assert) {
        const service: LoadingBar = this.owner.lookup('service:loading-bar');

        service.show();
        assert.true(service.isShown);

        service.hide();
        assert.false(service.isShown);
    });
});
