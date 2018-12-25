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
      <UploadButton actionName="avatarUpload">Upload Avatar</UploadButton>
      <div>
        <Btn :click="logout" title="Logout"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Btn from '~/components/atoms/button'
import UploadButton from '~/components/molecules/uploadButton'

export default {
  name: 'Profile',
  layout: 'protected',
  components: {
    Btn,
    UploadButton
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
      this.$router.push('/')
      await this.logout()
    }
  }
}
</script>
