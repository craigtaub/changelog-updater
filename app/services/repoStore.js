var Repo = (function () {
    function Repo(title) {
        this.title = title.trim();
    }
    Object.defineProperty(Repo.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return Repo;
})();
exports.Repo = Repo;
var RepoStore = (function () {
    function RepoStore() {
        var persistedRepos = JSON.parse(localStorage.getItem('repo-store') || '[]');
        // Normalize back into classes
        this.repos = persistedRepos.map(function (repo) {
            var ret = new Repo(repo._title);
            return ret;
        });
    }
    RepoStore.prototype.updateStore = function () {
        localStorage.setItem('repo-store', JSON.stringify(this.repos));
    };
    RepoStore.prototype.remove = function (repo) {
        this.repos = this.repos.filter(function (value) {
            return value.title !== repo.repoName;
        });
        this.updateStore();
    };
    RepoStore.prototype.add = function (title) {
        this.repos.push(new Repo(title));
        this.updateStore();
    };
    return RepoStore;
})();
exports.RepoStore = RepoStore;
//# sourceMappingURL=repoStore.js.map