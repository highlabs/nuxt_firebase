<template>
  <v-navigation-drawer temporary v-model="drawer" fixed app>
    <v-list>
      <v-list-tile v-for="(item, i) in items" :to="item.to" :key="i" router exact>
        <v-list-tile-action>
          <v-icon v-html="item.icon"/>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'drawer',
  data() {
    return {
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'alternate_email', title: 'Login', to: '/login' }
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(val) {
        this.$store.commit('toggleDrawer', val)
      }
    }
  }
}
</script>
