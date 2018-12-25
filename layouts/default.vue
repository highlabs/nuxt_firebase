<template>
  <v-app :dark="darkLayout">
    <Drawer/>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from '@/components/molecules/drawer'

export default {
  name: 'default-layout',
  components: {
    Drawer
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(val) {
        this.$store.commit('toggleDrawer', val)
      }
    },
    darkLayout: function() {
      return this.$store.state.darkLayout
    }
  }
}
</script>
