<template>
  <div class="todo-item">
     <input type="checkbox" v-model="completed" @change="switchComplete">
     <div v-if = "!editable" :class="{completed: completed}" class="text-item">
       {{ title }}
     </div>
     <div v-if="editable" class="text-item">
       <input type="text" v-model="title" v-focus class="edit-input"
              @keyup.enter = "toggleEditableTodo"
              @keyup.esc = "cancelEdit">
     </div>

     <div :class ="{disactive: completed}" class="edit-item" @click = "toggleEditableTodo">
       &#9998;
     </div>
     <div :class ="{disactive: completed}" class="remove-item" @click = "removeTodo(index)">
       &times
     </div>
   </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'todo-item',
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      checkAll: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        'id': this.item.id,
        'title': this.item.title,
        'completed': this.item.completed,
        'editable': this.item.editable,
        'beforeEditCache': ''
      }
    },
    methods: {
      ...mapMutations([
        'toggleComplete',
        'removeTodo',
        'editTodo'
      ]),
      toggleEditableTodo() {
        const current = this;

        if (current.completed) {
          return;
        }

        if (!current.editable) {
          this.beforeEditCache = current.title;
          //закончили редактировать и получили пустое значение
        } else if (this.isEmpty(current.title)) {
          current.title = this.beforeEditCache;
        }
        current.editable = !current.editable;

        this.editTodo({
          index: this.index,
          title: current.title
        })
      },
      switchComplete() {
        this.toggleComplete({
          index: this.index,
          isComplete: event.target.checked
        })
      },
      cancelEdit() {
        this.editable = false;
        this.title = this.beforeEditCache;
      },
      isEmpty(value) {
        return value.trim() == ''
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    watch: {
      checkAll() {
        this.completed = this.checkAll
      }
    }
  }
</script>
