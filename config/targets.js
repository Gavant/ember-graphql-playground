'use strict';

const browsers = ['last 1 Chrome versions', 'last 1 Firefox versions', 'last 1 Safari versions'];

// Ember's browser support policy is changing, and IE11 support will end in
// v4.0 onwards.
//
// See https://deprecations.emberjs.com/v3.x#toc_3-0-browser-support-policy
//
// If you need IE11 support on a version of Ember that still offers support
// for it, uncomment the code block below.
//
// const isCI = Boolean(process.env.CI);
// const isProduction = process.env.EMBER_ENV === 'production';
//
// if (isCI || isProduction) {
//   browsers.push('ie 11');
// }

module.exports = {
    browsers,
    // This fixes some issue where the app breaks in fastboot.
    // https://discord.com/channels/480462759797063690/485861149821239298/818887228011839499
    // Additionally there's a PR that supposedly fixed it for Ember 3.25+ but it still
    // doesn't work without this: https://github.com/emberjs/ember.js/pull/19397
    node: 'current'
};
