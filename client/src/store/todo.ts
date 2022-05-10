import { URI } from '@/config';
import Todo from '@/dto/todo';
import axios from 'axios';
import { action, createModule, mutation } from 'vuex-class-component';

const VuexModule = createModule({
    namespaced: 'todo',
    strict: false,
});

export class TodoStore extends VuexModule {
    private todos: Todo[] = [];

    get returnTodos() {
        return this.todos;
    }

    @mutation
    setTodos(todos: Todo[]) {
        this.todos = todos;
    }

    @mutation
    addTodo(todo: Todo) {
        this.todos.push(todo);
    }

    @mutation
    deleteTodo(id: number) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    @mutation
    updateTodo(updateTodo: Todo) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === updateTodo.id) return updateTodo;
            return todo;
        });
    }

    @action
    async requestTodos() {
        const response = await axios.get<Todo[]>(URI + 'todo');
        return this.setTodos(response.data);
    }

    @action
    async requestTodo(body: { title: string; description: string }) {
        try {
            const response = await axios.post<Todo>(URI + 'todo', body);
            this.addTodo(response.data);
            return true;
        } catch {
            return false;
        }
    }

    @action
    async requestDeleteTodo(id: number) {
        axios.delete(URI + 'todo/' + id);
        return this.deleteTodo(id);
    }

    // если добавить 2 парметра компилятор будет ругаться
    @action
    async requestUpdateTodo(options: { id: number; body: { title: string; description: string } }) {
        try {
            await axios.patch(URI + 'todo/' + options.id, options.body);
            this.updateTodo({ id: options.id, ...options.body });
            return true;
        } catch {
            return false;
        }
    }
}
export default TodoStore;
