<template>
  <div>
    <input type="text" class="todo-input"
           placeholder = "What needs to be done"
           v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp">
      <todo-item v-for ="(item, index) in todosFiltered"
                 :key = "item.id"
                 :item = "item"
                 :index = "index"
                 :checkAll = "!anyRemaining"/>
    </transition-group>

    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filtered />
      <todo-clear-completed :showClearCompletedBtn = "showClearCompletedBtn" />
    </div>
  </div>
</template>

<script>
  import TodoItem from './TodoItem.vue'
  import TodoItemsRemaining from './TodoItemsRemaining.vue'
  import TodoCheckAll from './TodoCheckAll.vue'
  import TodoFiltered from './TodoFiltered.vue'
  import TodoClearCompleted from './TodoClearCompleted.vue'

  import Vue from 'vue'
  import { mapGetters, mapState, mapMutations } from 'vuex';

  export default {
    name: 'todo-list',
    components: {
      TodoItem,
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted
    },
    data () {
      return {
        newTodo: '',
        nextTodoId: 4,
        checkAll: false
      }
    },
    methods:  {
      addTodo() {
        if (this.newTodo.trim() == '') {
          return;
        }
        const newTodoObj = {
          id: this.nextTodoId++,
          title: this.newTodo,
          completed: false,
          editable: false
        };

        this.todoList.push(newTodoObj); //в store уже обновляется массив с данными

        this.newTodo = ''
      }
    },
    computed: {
      ...mapState([
        'todoList',
        'filter'
      ]),
      ...mapGetters([
        'remaining',
        'anyRemaining',
        'todosFiltered',
        'showClearCompletedBtn'
      ]),
      ...mapMutations([
        'addNewTodo'
      ])
    }
  }
</script>

<style>
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .todo-item {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dotted silver;
    padding: 10px 0px
  }
  .todo-input:focus {
    outline: 0;
  }
  .remove-item, .edit-item {
    cursor: pointer;
    font-size: 1.2em;
    width: 5%;
  }
  .remove-item {
    margin-left: 10px;
    width: calc(5% - 10px)
  }
  .remove-item:hover, .edit-item:hover {
    color: #42b983;
  }
  .text-item {
    width: 90%;
  }
  .edit-input {
    outline: none;
    padding: 5px 10px;
    width: 90%;
    font-size: 16px;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .disactive {
    opacity: 0.5;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding-top: 14px;
    margin-bottom: 14px;
    color: #42b983;
  }
  button.active {
    color: #42b983;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
