import {bootstrap} from 'angular2/platform/browser';
import TodoApp from './app'
import {TodoStore} from './services/store';
import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(TodoApp, [TodoStore, HTTP_PROVIDERS]);
