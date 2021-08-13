/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (env) {
    return {
        clientAllowedKeys: [
            'ROOT_URL',
            'API_BASE_URL',
            'ASSETS_BASE_URL',
            'FASTBOOT_WHITELIST_DOMAIN',
            'GRAPHQL_ENDPOINT',
            'GRAPHQL_TOKEN'
        ],
        fastbootAllowedKeys: [
            'ROOT_URL',
            'API_BASE_URL',
            'ASSETS_BASE_URL',
            'FASTBOOT_WHITELIST_DOMAIN',
            'GRAPHQL_ENDPOINT',
            'GRAPHQL_TOKEN'
        ],
        failOnMissingKey: false,
        path: path.join(path.dirname(__dirname), `./.env-${process.env.DEPLOY_TYPE || env}`)
    };
};
