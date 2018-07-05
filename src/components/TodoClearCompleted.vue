<template>
  <div>
    <button v-if="showClearCompletedBtn" @click="deleteCompleted">Delete completed</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'todo-clear-completed',
    props: {
      showClearCompletedBtn: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapMutations([
        'deleteCompleted'
      ])
    }
  }
</script>
