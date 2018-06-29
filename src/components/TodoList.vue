<template>
  <div>
    <input type="text" class="todo-input"
           placeholder = "What needs to be done"
           v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div v-for="(item, index) in todosFiltered" :key="item.id" class="todo-item">
        <input type="checkbox" v-model="item.completed">
        <div v-if = "!item.editable" :class="{completed: item.completed}" class="text-item">
          {{ item.title }}
        </div>
        <div v-if="item.editable" class="text-item">
          <input type="text" v-model="item.title" v-focus class="edit-input"
                 @keyup.enter = "toggleEditableTodo(index)"
                 @keyup.esc="cancelEdit(item, index)">
        </div>
        <div :class ="{disactive: item.completed}" class="edit-item" @click = "toggleEditableTodo(index)">
          &#9998;
        </div>
        <div :class ="{disactive: item.completed}" class="remove-item" @click = "removeTodo(index)">
          &times
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label><input type="checkbox" :checked ="!anyRemaining" @change="checkAllTodos">Check All</label>
      </div>
      <div>{{remaining}} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
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
  export default {
    name: 'todo-list',
    data () {
      return {
        newTodo: '',
        filter: 'all',
        nextTodoId: 3,
        cached:[], /*закешированные значения перед редактированием*/
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
        if (this.isEmpty(this.newTodo)) {
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

      toggleEditableTodo(index) {
        const current = this.todoList[index];

        if (current.completed) {
          return;
        }

        if (!current.editable) {
          this.cached[index] = current.title;
          //закончили редактировать и получили пустое значение
        } else if (this.isEmpty(current.title)) {
          current.title = this.cached[index];
        }
        current.editable = !current.editable
      },

      cancelEdit(todo, index) {
        todo.editable = false;
        todo.title = this.cached[index];
      },

      isEmpty(value) {
        return value.trim() == ''
      },

      checkAllTodos() {
        this.todoList.forEach(item => item.completed = event.target.checked)
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
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
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
