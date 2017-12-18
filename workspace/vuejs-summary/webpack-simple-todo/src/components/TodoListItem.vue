<template class="src-components-todo-list-item">
  <li>
    {{ todo.text }}
    <button @click="$emit('remove', todo.id)">
      X
    </button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .src-components-todo-list-item {

  }
</style>
