import {bootstrap} from 'angular2/platform/browser';
import RepoApp from './app'
import {RepoStore} from './services/RepoStore';
import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(RepoApp, [RepoStore, HTTP_PROVIDERS]);
