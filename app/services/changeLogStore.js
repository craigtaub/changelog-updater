var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
require('rxjs/operator/map');
var apiUrl = window.location.href + 'api';
var ChangeLog = (function () {
    function ChangeLog(repoName, update) {
        this._repoName = repoName.trim();
        this._update = update.trim();
    }
    Object.defineProperty(ChangeLog.prototype, "repoName", {
        get: function () {
            return this._repoName;
        },
        set: function (value) {
            this._repoName = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangeLog.prototype, "update", {
        get: function () {
            return this._update;
        },
        set: function (value) {
            this._update = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return ChangeLog;
})();
exports.ChangeLog = ChangeLog;
var ChangeLogStore = (function () {
    function ChangeLogStore(http) {
        this.changelogs = [];
        this.http = http;
    }
    ChangeLogStore.prototype.makeRequest = function (url) {
        var _this = this;
        this.http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.successRequest(data); }, function (err) { return _this.errorRequest(err); }, function () { return _this.alwaysRequest(); });
    };
    ChangeLogStore.prototype.successRequest = function (data) {
        var item = data.data[0];
        if (item.hasOwnProperty('repoName')) {
            this.changelogs.push(new ChangeLog(item.repoName, item.update));
        }
    };
    ChangeLogStore.prototype.errorRequest = function (error) {
        // console.log(error);
    };
    ChangeLogStore.prototype.alwaysRequest = function () {
        // console.log('always run')
    };
    ChangeLogStore.prototype.add = function (repoName) {
        this.makeRequest(apiUrl + '?repos=' + repoName);
    };
    ChangeLogStore.prototype.remove = function (repo) {
        this.changelogs = this.changelogs.filter(function (value) {
            return value.repoName !== repo.repoName;
        });
    };
    ChangeLogStore = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChangeLogStore);
    return ChangeLogStore;
})();
exports.ChangeLogStore = ChangeLogStore;
//# sourceMappingURL=changeLogStore.js.map