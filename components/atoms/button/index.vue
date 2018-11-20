<template>
  <button @click.prevent="click">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    click: {
      type: Function,
      required: true
    }
  }
}
</script>
