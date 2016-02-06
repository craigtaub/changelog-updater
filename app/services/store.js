var Todo = (function () {
    function Todo(title) {
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
    }
    Object.defineProperty(Todo.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return Todo;
})();
exports.Todo = Todo;
var TodoStore = (function () {
    function TodoStore() {
        var persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
        // Normalize back into classes
        this.todos = persistedTodos.map(function (todo) {
            var ret = new Todo(todo._title);
            ret.completed = todo.completed;
            return ret;
        });
    }
    TodoStore.prototype.updateStore = function () {
        localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
    };
    TodoStore.prototype.getWithCompleted = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoStore.prototype.allCompleted = function () {
        return this.todos.length === this.getCompleted().length;
    };
    TodoStore.prototype.setAllTo = function (completed) {
        this.todos.forEach(function (t) { return t.completed = completed; });
        this.updateStore();
    };
    TodoStore.prototype.removeCompleted = function () {
        this.todos = this.getWithCompleted(false);
        this.updateStore();
    };
    TodoStore.prototype.getRemaining = function () {
        return this.getWithCompleted(false);
    };
    TodoStore.prototype.getCompleted = function () {
        return this.getWithCompleted(true);
    };
    TodoStore.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
        this.updateStore();
    };
    TodoStore.prototype.remove = function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    };
    TodoStore.prototype.add = function (title) {
        this.todos.push(new Todo(title));
        console.log('ADD');
        this.updateStore();
    };
    return TodoStore;
})();
exports.TodoStore = TodoStore;
var Thing = (function () {
    function Thing(title) {
        this.title = title.trim();
    }
    Object.defineProperty(Thing.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return Thing;
})();
exports.Thing = Thing;
var ChangeLogStore = (function () {
    function ChangeLogStore() {
        console.log('ChangeLogStore constructor');
        var thingOne = new Thing('first');
        var thingTwo = new Thing('second');
        this.changelogs = [thingOne, thingTwo];
    }
    return ChangeLogStore;
})();
exports.ChangeLogStore = ChangeLogStore;
//# sourceMappingURL=store.js.map