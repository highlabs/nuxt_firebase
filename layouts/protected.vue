<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>

<style>
a {
  padding: 5px;
}
</style>
