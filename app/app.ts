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
		this.repoStore = repoStore;
		this.changeLogStore = changeLogStore;

		// when loads app repos already added onto page
		this.repoStore.repos.forEach((item) => {
				this.changeLogStore.add(item.title);
		});

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
		this.changeLogStore.remove(repo);
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
