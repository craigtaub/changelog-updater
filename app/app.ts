import {Component} from 'angular2/core';
import {ChangeLogStore, TodoStore, Todo} from './services/store';

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html',
	bindings: [ChangeLogStore, TodoStore]
})
export default class TodoApp {
	todoStore: TodoStore;
	changeLogStore: ChangeLogStore;
	newTodoText = '';

	constructor(todoStore: TodoStore, changeLogStore: ChangeLogStore) {
		this.todoStore = todoStore;
		this.changeLogStore = changeLogStore;
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText);
			this.newTodoText = '';
		}
	}
}
