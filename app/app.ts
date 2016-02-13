import {Component} from 'angular2/core';
import {RepoStore, Repo} from './services/repoStore';
import {ChangeLogStore, ChangeLog} from './services/changeLogStore';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';

const apiUrl = window.location.href + 'subscribe';

@Component({
	selector: 'repo-app',
	templateUrl: 'app/app.html',
	bindings: [ChangeLogStore, RepoStore]
})

export default class RepoApp {
	repoStore: RepoStore;
	changeLogStore: ChangeLogStore;
	newRepoText = '';
	newSubText = '';
	subStatus = 'show';
	subThanks = 'hide';
	http: Http;

	constructor(repoStore: RepoStore, changeLogStore: ChangeLogStore, @Inject(Http) http:Http) {
		this.repoStore = repoStore;
		this.changeLogStore = changeLogStore;

		// when loads app repos already added onto page
		// create array to make request to BE
		let params = [];
		this.repoStore.repos.forEach((item) => {
			params.push(item.title);
		});
		this.changeLogStore.add(params.join(','));

		this.http = http;
	}

	remove(repo: ChangeLog){
		this.changeLogStore.remove(repo);
		this.repoStore.remove(repo);
	}

	addRepo() {
		if (this.newRepoText.trim().length) {
			// cant add more than 10
			if (this.changeLogStore.changelogs.length < 10) {
				this.changeLogStore.add(this.newRepoText.trim());
				this.repoStore.add(this.newRepoText.trim());
				this.newRepoText = '';
			} else {
				this.newRepoText = 'Sorry you have hit the limit';
			}
		}
	}

	toggle(repo: ChangeLog) {
		this.changeLogStore.toggle(repo)
	}

	addSub() {
		this.http.get(apiUrl + '/' + this.newSubText)
			.map(res => res.text())
			.subscribe(
				() => this.alwaysRequest()
			);

	}

	alwaysRequest() {
		this.subStatus = 'hide';
		this.subThanks = 'show';
	}

}
