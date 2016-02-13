import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';
import 'rxjs/operator/map';

const apiUrl = window.location.href + 'api';

export class ChangeLog {
	private _repoName: String;
	private _update: String;
	private _show: String;

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
	get show() {
		return this._show;
	}
	set show(value: String) {
		this._show = value;
	}
	constructor(repoName: String, update: String) {
		this._repoName = repoName.trim();
		this._update = update.trim();
		this._show = 'hide';
	}
}

export class ChangeLogStore {
	changelogs: Array<ChangeLog>;
	http: Http;

	constructor(@Inject(Http) http:Http) {
		this.changelogs = [];

		this.http = http;
	}

	useFixture() {
		let data = {
			data: [
				{
					repoName: 'testFixture',
					update: 'some fixture data'
				}
			]
		};
		this.successRequest(data);
	}

	makeRequest(url: string) {
		// Use Fixture
		// this.useFixture();

		// Use Live
		this.http.get(url)
			.map(res => res.json())
			.subscribe(
				data => this.successRequest(data),
				err => this.errorRequest(err),
				() => this.alwaysRequest()
			);
	}
	successRequest(data) {
    	if (data.data !== 'no repo') {
			data.data.forEach((item: ChangeLog) => {
				if (item.hasOwnProperty('repoName')) {
					this.changelogs.push(new ChangeLog(item.repoName, item.update));
				}
			});
		}
	}

	errorRequest(error: string) {
		// console.log(error);
	}

	alwaysRequest() {
		// console.log('always run')
	}

	add(repoName: string) {

		this.makeRequest(apiUrl + '?repos=' + repoName);
	}

	remove(repo: ChangeLog) {

		this.changelogs = this.changelogs.filter(function (value) {
			return value.repoName !== repo.repoName;
		});
	}

	toggle(repo: ChangeLog) {
		this.changelogs.map(function (value) {
			if (value.repoName === repo.repoName) {
				if (value.show === 'hide') {
					value.show = 'show';
				} else {
					value.show = 'hide';
				}
			}
		});
	}
}
