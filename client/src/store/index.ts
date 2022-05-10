import { createStore } from 'vuex';
import { createProxy, extractVuexModule } from 'vuex-class-component';
import TodoStore from './todo';

export const store = createStore({
    modules: {
        ...extractVuexModule(TodoStore),
    },
});

export const vxm = {
    todo: createProxy(store, TodoStore),
};
