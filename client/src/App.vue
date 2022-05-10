<template>
    <div class="container">
        <h1 class="title">Todo list</h1>
        <div>
            <Item v-for="todo in getTodos" :key="todo.id" v-bind:item="todo" />
        </div>
        <div v-show="isShowModal" class="modal__wrapper" @click="showModal(false, $event)">
            <div class="modal">
                <h2 v-show="error">{{ error }}</h2>
                <label for="title">Title</label>
                <input required v-model="title" id="title" type="text" />
                <label for="description">Description</label>
                <input v-model="description" id="description" type="text" />
                <button @click="addTodo()">Добавить</button>
            </div>
        </div>
        <button class="button dial" @click="showModal(true)">+</button>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Item from './components/Item.vue';
import { vxm } from './store/index';

@Options({
    components: {
        Item,
    },
})
export default class App extends Vue {
    isShowModal = false;
    title = '';
    description = '';
    error: string | null = null;

    get getTodos() {
        return vxm.todo.returnTodos;
    }

    get getShowModal() {
        return this.isShowModal;
    }

    mounted() {
        vxm.todo.requestTodos();
    }

    showModal(show: boolean, $event: any) {
        if ($event) {
            if ($event.target.className !== 'modal__wrapper') {
                return;
            }
        }

        this.isShowModal = show;
    }

    async addTodo() {
        const isSuccess = await vxm.todo.requestTodo({
            title: this.title,
            description: this.description,
        });
        if (!isSuccess) {
            this.error = 'empty field';
            return;
        }
        this.error = null;
        this.isShowModal = false;
    }
}
</script>
