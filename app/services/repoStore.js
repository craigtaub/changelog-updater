var Repo = (function () {
    function Repo(title) {
        this.completed = false;
        this.editing = false;
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
        console.log('repoStore const start');
        var persistedRepos = JSON.parse(localStorage.getItem('repo-store') || '[]');
        // Normalize back into classes
        this.repos = persistedRepos.map(function (repo) {
            var ret = new Repo(repo._title);
            ret.completed = repo.completed;
            return ret;
        });
        console.log('repoStore const end');
    }
    RepoStore.prototype.updateStore = function () {
        localStorage.setItem('repo-store', JSON.stringify(this.repos));
    };
    RepoStore.prototype.getWithCompleted = function (completed) {
        return this.repos.filter(function (repo) { return repo.completed === completed; });
    };
    RepoStore.prototype.allCompleted = function () {
        return this.repos.length === this.getCompleted().length;
    };
    RepoStore.prototype.setAllTo = function (completed) {
        this.repos.forEach(function (t) { return t.completed = completed; });
        this.updateStore();
    };
    RepoStore.prototype.removeCompleted = function () {
        this.repos = this.getWithCompleted(false);
        this.updateStore();
    };
    RepoStore.prototype.getRemaining = function () {
        return this.getWithCompleted(false);
    };
    RepoStore.prototype.getCompleted = function () {
        return this.getWithCompleted(true);
    };
    RepoStore.prototype.toggleCompletion = function (repo) {
        repo.completed = !repo.completed;
        this.updateStore();
    };
    RepoStore.prototype.remove = function (repo) {
        this.repos.splice(this.repos.indexOf(repo), 1);
        this.updateStore();
    };
    RepoStore.prototype.add = function (title) {
        console.log('add repoStore');
        this.repos.push(new Repo(title));
        this.updateStore();
    };
    return RepoStore;
})();
exports.RepoStore = RepoStore;
//# sourceMappingURL=repoStore.js.map