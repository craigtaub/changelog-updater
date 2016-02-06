import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';
import 'rxjs/operator/map';

const apiUrl = 'http://localhost:3000/api';

export class ChangeLog {
	private _repoName: String;
	private _update: String;

	get repoName() {
		return this._repoName;
	}
	set repoName(value: String) {
		this._repoName = value.trim();
	}
	get update() {
		return this._update;
	}
	set update(value: String) {
		this._update = value.trim();
	}

	constructor(repoName: String, update: String) {
		this._repoName = repoName.trim();
		this._update = update.trim();
	}
}

export class ChangeLogStore {
	changelogs: Array<ChangeLog>;
	http: Http;

	constructor(@Inject(Http) http:Http) {
		console.log('changeLogStore const start');
		this.changelogs = [];

		this.http = http;

		// when load get request
		// http.get('http://localhost:3000/api?repos=goatslacker/alt')
		// this.makeRequest(apiUrl);
		console.log('changeLogStore const end');
	}

	makeRequest(url: string) {
		this.http.get(url)
			.map(res => res.json())
			.subscribe(
				data => this.successRequest(data),
				err => this.errorRequest(err),
				() => this.alwaysRequest()
			);
	}
	successRequest(data: string) {
		let item = data.data[0];
		if (item.hasOwnProperty('repoName')) {
			this.changelogs.push(new ChangeLog(item.repoName, item.update));
		}
	}

	errorRequest(error: string) {
		console.log(error);
	}

	alwaysRequest() {
		console.log('always run')
	}

	add(repo: string) {
		console.log('add changeLogStore');
		this.makeRequest(apiUrl + '?repos=' + repo);
	}

	remove(repo: string) {

		this.changelogs = this.changelogs.filter(function (value) {
			return value.repoName !== repo.title;
		});

	}
}
