import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const AppStore = new Vuex.Store({
  state: {
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
      },
      {
        'id': 3,
        'title': 'Study English',
        'completed': false,
        'editable': false
      }
    ],
    filter: 'all'
  },
  getters: {
    remaining: state => {
      return state.todoList.filter(item => !item.completed).length
    },
    anyRemaining: (state, getters) => {
      return getters.remaining != 0
    },
    todosFiltered: state => {
      if (state.filter == 'all') {
        return state.todoList
      } else if (state.filter == 'active') {
        return state.todoList.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todoList.filter(todo => todo.completed)
      }
      return state.todoList;
    },
    showClearCompletedBtn: state => {
      return state.todoList.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    toggleComplete(state, payload) {
      const { index, isComplete} = payload;
      state.todoList[index].completed = isComplete
    },
    removeTodo(state, index) {
      state.todoList.splice(index, 1);
    },
    editTodo(state, payload) {
      const { index, title } = payload;
      state.todoList[index].title = title;
    },
    checkAll(state, status) {
      state.todoList.forEach((item) => item.completed = status);
      //при этом вычисляются свойства remaining() и с ним связанные
    },
    deleteCompleted(state) {
      const prevTodoList = state.todoList.filter(todo => !todo.completed);
      state.todoList = prevTodoList;
    }
  }
});
