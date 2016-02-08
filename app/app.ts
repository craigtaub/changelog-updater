import {Component} from 'angular2/core';
import {RepoStore, Repo} from './services/repoStore';
import {ChangeLogStore} from './services/changeLogStore';

@Component({
	selector: 'repo-app',
	templateUrl: 'app/app.html',
	bindings: [ChangeLogStore, RepoStore]
})

export default class RepoApp {
	repoStore: RepoStore;
	changeLogStore: ChangeLogStore;
	newRepoText = '';

	constructor(repoStore: RepoStore, changeLogStore: ChangeLogStore) {
		this.repoStore = repoStore;
		this.changeLogStore = changeLogStore;

		// when loads app repos already added onto page
		// create array to make request to BE
		let params = [];
		this.repoStore.repos.forEach((item) => {
			params.push(item.title);
		});
		this.changeLogStore.add(params.join(','));

	}

	remove(repo: Repo){
		this.changeLogStore.remove(repo);
		this.repoStore.remove(repo);
	}

	addRepo() {
		if (this.newRepoText.trim().length) {
			this.changeLogStore.add(this.newRepoText.trim());
			this.repoStore.add(this.newRepoText.trim());
			this.newRepoText = '';
		}
	}

	toggle(repo: Repo) {
		this.changeLogStore.toggle(repo)
	}
}
