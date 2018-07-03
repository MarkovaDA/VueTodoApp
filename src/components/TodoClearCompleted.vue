<template>
  <div>
    <button v-if="showClearCompletedBtn" @click="handleClearCompleted">Delete completed</button>
  </div>
</template>

<script>
  export default {
    name: 'todo-clear-completed',
    props: {
      showClearCompletedBtn: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      handleClearCompleted() {
        eventEmitter.$emit('clearCompleted')
      }
    }
  }
</script>
