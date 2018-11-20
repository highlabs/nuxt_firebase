<template>
  <section class="container">
    <div>
      <h1 class="title">
        Nuxt Firebase
      </h1>
      <p>
        Your profile:
      </p>
      <div v-if="profile">
        <h5>
          {{ profile.displayName }}
        </h5>
        <p>
          {{ profile.email }}
        </p>
        <img 
          :src="profile.avatar" 
          alt="">
          
      </div>
      <div>
        <Btn 
          :click="googleLogin"
          title="Login With Google"/>
        <Btn 
          :click="logout"
          title="Logout"/>
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
    },
    logout: function() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
