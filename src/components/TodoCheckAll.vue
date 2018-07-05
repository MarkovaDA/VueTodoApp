<template>
  <div>
    <label><input type="checkbox" :checked ="!anyRemaining" @change="toggleCheckAll">Check All</label>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'todo-check-all',
    props: {
      anyRemaining: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapMutations([
        'checkAll'
      ]),
      toggleCheckAll() {
        this.checkAll(event.target.checked);
      }
    }
  }
</script>
