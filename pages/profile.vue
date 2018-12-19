<template>
  <section class="container">
    <div>
      <h1 class="title">Your profile</h1>
      <p>Your profile:</p>
      <div v-if="profile">
        <h5>{{ profile.displayName }}</h5>
        <p>{{ profile.email }}</p>
        <img :src="profile.avatar" alt>
      </div>
      <div>
        <Btn :click="logout" title="Logout"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Btn from '~/components/atoms/button'

export default {
  name: 'Profile',
  layout: 'protected',
  components: {
    Btn
  },
  computed: {
    profile() {
      return this.$store.state.profile
    }
  },
  methods: {
    ...mapActions(['logout']),
    googleLogin: function() {
      this.$store.dispatch('loginGoogle')
    },
    async signout() {
      await this.logout()
      this.$router.push('/')
    }
  }
}
</script>
