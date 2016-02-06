var browser_1 = require('angular2/platform/browser');
var app_1 = require('./app');
var store_1 = require('./services/store');
var http_1 = require('angular2/http');
browser_1.bootstrap(app_1.default, [store_1.TodoStore, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=bootstrap.js.map