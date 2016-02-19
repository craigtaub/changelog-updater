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
	introStatus = 'hide';
	showIntroStatus = 'show';
	http: Http;

	constructor(repoStore: RepoStore, changeLogStore: ChangeLogStore, @Inject(Http) http:Http) {
		this.repoStore = repoStore;
		this.changeLogStore = changeLogStore;

		if (this.getCookie('changelog-tool-dismiss') !== '1') {
			this.introStatus = 'show';
			this.showIntroStatus = 'hide';
		}

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

	dismiss() {
		this.introStatus = 'hide';
		this.showIntroStatus = 'show';
		this.setCookie('changelog-tool-dismiss', '1', 60);
	}

	display() {
		this.introStatus = 'show';
		this.showIntroStatus = 'hide';
		this.deleteCookie('changelog-tool-dismiss');
	}

	setCookie(name: string, value: string, expireDays: number, path: string = '') {
		let d:Date = new Date();
		d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
		let expires:string = 'expires=' + d.toUTCString();
		document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
	}

	getCookie(name: string) {
		let ca: Array<string> = document.cookie.split(';');
		let caLen: number = ca.length;
		let cookieName = name + '=';
		let c: string;

		for (let i: number = 0; i < caLen; i += 1) {
				c = ca[i].replace(/^\s\+/g, '');
				if (c.indexOf(cookieName) == 0) {
						return c.substring(cookieName.length, c.length);
				}
		}
		return '';
	}

	deleteCookie(name: string) {
       this.setCookie(name, "", -1);
   }


}
