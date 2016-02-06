export class Repo {
	completed: Boolean;
	editing: Boolean;

	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}

	constructor(title: String) {
		this.completed = false;
		this.editing = false;
		this.title = title.trim();
	}
}

export class RepoStore {
	repos: Array<Repo>;

	constructor() {
		let persistedRepos = JSON.parse(localStorage.getItem('repo-store') || '[]');
		// Normalize back into classes
		this.repos = persistedRepos.map( (repo: {_title: String, completed: Boolean}) => {
			let ret = new Repo(repo._title);
			ret.completed = repo.completed;
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('repo-store', JSON.stringify(this.repos));
	}

	private getWithCompleted(completed: Boolean) {
		return this.repos.filter((repo: Repo) => repo.completed === completed);
	}

	allCompleted() {
		return this.repos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.repos.forEach((t: Repo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.repos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(repo: Repo) {
		repo.completed = !repo.completed;
		this.updateStore();
	}

	remove(repo: Repo) {
		this.repos.splice(this.repos.indexOf(repo), 1);
		this.updateStore();
	}

	add(title: String) {
		this.repos.push(new Repo(title));
		// console.log('ADD');

		this.updateStore();
	}
}
