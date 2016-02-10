import {ChangeLog} from './changeLogStore';

export class Repo {

	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}

	constructor(title: String) {
		this.title = title.trim();
	}
}

export class RepoStore {
	repos: Array<Repo>;

	constructor() {
		let persistedRepos = JSON.parse(localStorage.getItem('repo-store') || '[]');
		// Normalize back into classes
		this.repos = persistedRepos.map( (repo: {_title: String}) => {
			let ret = new Repo(repo._title);
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('repo-store', JSON.stringify(this.repos));
	}

	remove(repo: ChangeLog) {
		this.repos = this.repos.filter(function (value) {
			return value.title !== repo.repoName;
		});

		this.updateStore();
	}

	add(title: String) {
		this.repos.push(new Repo(title));

		this.updateStore();
	}
}
