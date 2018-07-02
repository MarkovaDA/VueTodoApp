<template>
  <div>
    <label><input type="checkbox" :checked ="!anyRemaining" @change="handleAllChecked">Check All</label>
  </div>
</template>

<script>
  export default {
    name: 'todo-check-all',
    props: {
      anyRemaining: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      handleAllChecked() {
        eventEmitter.$emit('checkAllChanged', event.target.checked)
      }
    }
  }
</script>
