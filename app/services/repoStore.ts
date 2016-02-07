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
		console.log('repoStore const start');
		let persistedRepos = JSON.parse(localStorage.getItem('repo-store') || '[]');
		// Normalize back into classes
		this.repos = persistedRepos.map( (repo: {_title: String, completed: Boolean}) => {
			let ret = new Repo(repo._title);
			ret.completed = repo.completed;
			return ret;
		});

		console.log('repoStore const end');
	}

	private updateStore() {
		localStorage.setItem('repo-store', JSON.stringify(this.repos));
	}

	remove(repo: Repo) {
		this.repos.splice(this.repos.indexOf(repo), 1);
		this.updateStore();
	}

	add(title: String) {
		console.log('add repoStore');
		this.repos.push(new Repo(title));

		this.updateStore();
	}
}
