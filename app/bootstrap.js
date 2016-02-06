var browser_1 = require('angular2/platform/browser');
var app_1 = require('./app');
var RepoStore_1 = require('./services/RepoStore');
var http_1 = require('angular2/http');
browser_1.bootstrap(app_1.default, [RepoStore_1.RepoStore, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=bootstrap.js.map