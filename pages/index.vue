<template>
  <section class="container">
    <div>
      <h1 class="title">Nuxt Firebase</h1>
      <nuxt-link v-if="profile" to="/profile">Profile</nuxt-link>

      <div>
        <Btn v-if="!profile" :click="googleLogin" title="Login With Google"/>
      </div>
    </div>
  </section>
</template>

<script>
import Btn from '~/components/atoms/button'

export default {
  name: 'Home',
  components: {
    Btn
  },
  computed: {
    profile() {
      return this.$store.state.profile
    }
  },
  methods: {
    googleLogin: function() {
      this.$store.dispatch('loginGoogle')
    }
  }
}
</script>
