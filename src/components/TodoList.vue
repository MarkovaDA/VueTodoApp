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
      <div>
        <label><input type="checkbox" :checked ="!anyRemaining" @change="checkAllTodos">Check All</label>
      </div>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}"  @click = "filter = 'all'">All</button>
        <button :class="{ active: filter == 'active'}"  @click = "filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed'}" @click = "filter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name = "fade">
          <button v-if="showClearCompletedBtn" @click="clearCompleted">Delete completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoItem from './TodoItem.vue'
  import TodoItemsRemaining from './TodoItemsRemaining.vue'

  export default {
    name: 'todo-list',
    components: {
      TodoItem,
      TodoItemsRemaining
    },
    data () {
      return {
        newTodo: '',
        filter: 'all',
        nextTodoId: 3,
        checkAll: false,
        todoList: [
          {
            'id': 1,
            'title': 'Finish Vue Screencast',
            'completed': false,
            'editable': false,
          },
          {
            'id': 2,
            'title': 'Take over world',
            'completed': false,
            'editable': false
          }
        ]
      }
    },
    methods:  {
      addTodo() {
        if (this.newTodo.trim() == '') {
          return;
        }

        this.todoList.push({
          id: this.nextTodoId++,
          title: this.newTodo,
          completed: false,
          editable: false
        });

        this.newTodo = ''
      },

      removeTodo(index) {
        if (this.todoList[index].completed) {
          return;
        }
        this.todoList.splice(index, 1);
      },

      completeTodo(data) {
        const { index, value } = data;
        this.todoList[index].completed = value;
      },

      checkAllTodos() {
        this.todoList.forEach(item => item.completed = event.target.checked);
      },

      clearCompleted() {
        //удалить посещенные
        this.todoList = this.todoList.filter(todo => !todo.completed);
      }
    },
    computed: {
      remaining() {
        return this.todoList.filter(item => !item.completed).length
      },
      anyRemaining() {
        return this.remaining != 0
      },
      todosFiltered() {
        if (this.filter == 'all') {
          return this.todoList
        } else if (this.filter == 'active') {
            return this.todoList.filter(todo => !todo.completed)
        } else if (this.filter == 'completed') {
          return this.todoList.filter(todo => todo.completed)
        }
        return this.todoList;
      },

      showClearCompletedBtn() {
        return this.todoList.filter(todo => todo.completed).length > 0
      }
    },

    mounted() {
      eventEmitter.$on('removedTodo', (index) => this.removeTodo(index));
      eventEmitter.$on('completedTodo', (data) => this.completeTodo(data));
    },

    beforeDestroy() {
      eventEmitter.$off('removedTodo');
      eventEmitter.$off('completedTodo');
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
