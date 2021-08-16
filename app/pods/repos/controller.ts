import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ReposController extends Controller {
    @tracked organization = 'gavant';
}

declare module '@ember/controller' {
    interface Registry {
        repos: ReposController;
    }
}
