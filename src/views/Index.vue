<template>
  <v-app>
    <v-btn
      v-if="!$vuetify.theme.dark"
      fixed
      right
      bottom
      fab
      @click="darkmodeToggle()"
    >
      <v-icon>mdi-moon-waning-crescent</v-icon>
    </v-btn>
    <v-btn
      v-if="$vuetify.theme.dark"
      fixed
      right
      bottom
      fab
      @click="darkmodeToggle()"
    >
      <v-icon>
        mdi-white-balance-sunny
      </v-icon>
    </v-btn>
    <app-bar @drawer="drawer = !drawer" />
    <default-drawer v-model="drawer" />
    <content-view />
  </v-app>
</template>
<script>
import '@/sass/overrides.sass'

export default {
    name: 'App',
    components: {
        AppBar: () => import(
            /* webpackChunkName: "AppBar" */
            './layout/common/AppBar'
        ),
        DefaultDrawer: () => import(
            /* webpackChunkName: "Drawer" */
            './layout/common/Drawer'
        ),
        ContentView: () => import(
            /* webpackChunkName: "View" */
            './layout/common/View'
        )
    },
    data: () => ({
        drawer: false,
        right: null,
    }),
    methods: {
        darkmodeToggle(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
    },

};
</script>
<style lang="">

</style>
