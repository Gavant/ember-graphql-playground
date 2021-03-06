import EmberRouter from '@ember/routing/router';
import config from 'ember-graphql-playground/config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    //@see https://blog.emberjs.com/2016/04/28/baseurl ("Configuring the Router" section)
    rootURL = config.routerRootURL;
}

Router.map(function() {
  this.route('login');
  this.route('password', function() {
      this.route('forgot');
      this.route('reset');
  });

  //make sure these routes are always defined last!
  this.route('five-hundred', { path: '/500' });
  this.route('four-oh-three', { path: '/403' });
  this.route('four-oh-four', { path: '/*path' });
  this.route('repos');
});
