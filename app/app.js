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
var core_1 = require('angular2/core');
var repoStore_1 = require('./services/repoStore');
var changeLogStore_1 = require('./services/changeLogStore');
var http_1 = require('angular2/http');
var core_2 = require('angular2/core');
var apiUrl = window.location.href + 'subscribe';
var RepoApp = (function () {
    function RepoApp(repoStore, changeLogStore, http) {
        this.newRepoText = '';
        this.newSubText = '';
        this.subStatus = 'show';
        this.subThanks = 'hide';
        this.introStatus = 'hide';
        this.repoStore = repoStore;
        this.changeLogStore = changeLogStore;
        if (this.getCookie('changelog-tool-dismiss') !== '1') {
            this.introStatus = 'show';
        }
        // when loads app repos already added onto page
        // create array to make request to BE
        var params = [];
        this.repoStore.repos.forEach(function (item) {
            params.push(item.title);
        });
        this.changeLogStore.add(params.join(','));
        this.http = http;
    }
    RepoApp.prototype.remove = function (repo) {
        this.changeLogStore.remove(repo);
        this.repoStore.remove(repo);
    };
    RepoApp.prototype.addRepo = function () {
        if (this.newRepoText.trim().length) {
            // cant add more than 10
            if (this.changeLogStore.changelogs.length < 10) {
                this.changeLogStore.add(this.newRepoText.trim());
                this.repoStore.add(this.newRepoText.trim());
                this.newRepoText = '';
            }
            else {
                this.newRepoText = 'Sorry you have hit the limit';
            }
        }
    };
    RepoApp.prototype.toggle = function (repo) {
        this.changeLogStore.toggle(repo);
    };
    RepoApp.prototype.addSub = function () {
        var _this = this;
        this.http.get(apiUrl + '/' + this.newSubText)
            .map(function (res) { return res.text(); })
            .subscribe(function () { return _this.alwaysRequest(); });
    };
    RepoApp.prototype.alwaysRequest = function () {
        this.subStatus = 'hide';
        this.subThanks = 'show';
    };
    RepoApp.prototype.dismiss = function () {
        this.introStatus = 'hide';
        this.setCookie('changelog-tool-dismiss', '1', 7);
    };
    RepoApp.prototype.setCookie = function (name, value, expireDays, path) {
        if (path === void 0) { path = ''; }
        var d = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
    };
    RepoApp.prototype.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + '=';
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    };
    RepoApp = __decorate([
        core_1.Component({
            selector: 'repo-app',
            templateUrl: 'app/app.html',
            bindings: [changeLogStore_1.ChangeLogStore, repoStore_1.RepoStore]
        }),
        __param(2, core_2.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [repoStore_1.RepoStore, changeLogStore_1.ChangeLogStore, http_1.Http])
    ], RepoApp);
    return RepoApp;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RepoApp;
//# sourceMappingURL=app.js.map