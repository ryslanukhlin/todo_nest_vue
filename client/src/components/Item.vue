<template>
    <div class="item">
        <div>
            <h2 v-show="error">{{ error }}</h2>
            <div v-if="!edit">Title: {{ todo.title }}</div>
            <div v-else>
                <input required type="text" placeholder="Title" v-model="title" />
            </div>
            <div v-if="!edit">Desctiption: {{ todo.description }}</div>
            <div v-else>
                <input required type="text" placeholder="Desctiption" v-model="description" />
            </div>
        </div>
        <div class="acitons">
            <button v-show="edit" class="button" @click="updateTodo">
                <img
                    src="https://cdn.icon-icons.com/icons2/1238/PNG/512/checkmark_83735.png"
                    alt="delete"
                />
            </button>
            <button v-if="!edit" class="button" @click="setEdit">
                <img
                    src="https://cdn.icon-icons.com/icons2/569/PNG/512/pen-black-diagonal-symbol-of-writing-tool_icon-icons.com_54470.png"
                    alt="delete"
                />
            </button>
            <button v-else class="button" @click="closeEdit">
                <img
                    src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115230-cancel-close-cross-delete_114048.png"
                    alt="delete"
                />
            </button>
            <button class="button" @click="deleteTodo">
                <img
                    src="https://cdn.icon-icons.com/icons2/2796/PNG/512/trashcan_delete_remove_trash_icon_178327.png"
                    alt="delete"
                />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Todo from '../dto/todo';
import { prop, Vue } from 'vue-class-component';
import { vxm } from '../store/index';

export class Props {
    item = prop<Todo>({ required: true });
}

export default class Item extends Vue.with(Props) {
    edit = false;
    title = this.item.title;
    description = this.item.description;
    error: string | null = null;

    get todo() {
        return this.item;
    }

    closeEdit() {
        this.edit = false;
        this.title = this.item.title;
        this.description = this.item.description;
        this.error = null;
    }

    setEdit() {
        this.edit = !this.edit;
    }

    deleteTodo() {
        vxm.todo.requestDeleteTodo(this.item.id);
    }

    async updateTodo() {
        if (this.title === this.item.title && this.description === this.item.description) {
            return;
        }
        const isSuccess = await vxm.todo.requestUpdateTodo({
            id: this.item.id,
            body: { title: this.title, description: this.description },
        });
        if (isSuccess) {
            this.error = null;
            this.setEdit();
        } else this.error = 'Empty field!';
    }
}
</script>
