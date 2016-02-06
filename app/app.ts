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
	newTodoText = '';

	constructor(repoStore: RepoStore, changeLogStore: ChangeLogStore) {
				console.log('constructor');
		this.repoStore = repoStore;
		this.changeLogStore = changeLogStore;
	}

	stopEditing(repo: Repo, editedTitle: string) {
		repo.title = editedTitle;
		repo.editing = false;
	}

	cancelEditingTodo(repo: Repo) {
		repo.editing = false;
	}

	updateEditingTodo(repo: Repo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		repo.editing = false;

		if (editedTitle.length === 0) {
			return this.repoStore.remove(repo);
		}

		repo.title = editedTitle;
	}

	editTodo(repo: Repo) {
		repo.editing = true;
	}

	removeCompleted() {
		this.repoStore.removeCompleted();
	}

	toggleCompletion(repo: Repo) {
		this.repoStore.toggleCompletion(repo);
	}

	remove(repo: Repo){
		this.repoStore.remove(repo);
	}

	addTodo() {

		if (this.newTodoText.trim().length) {
			this.changeLogStore.add(this.newTodoText.trim());
			this.repoStore.add(this.newTodoText);
			this.newTodoText = '';
		}
	}
}
