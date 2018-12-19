<template>
  <v-btn @click.prevent="click">{{ title }}</v-btn>
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
