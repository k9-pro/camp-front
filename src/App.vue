<template>
  <!-- <v-app
    <default-index />
  </v-app> -->
  <v-fade-transition
    name="fade"
    mode="out-in"
  >
    <router-view />
  </v-fade-transition>
</template>

<script>
// import DefaultIndex from './views/Index'
export default {
    name: 'App',
    // components: {
    // 	DefaultIndex
    // }
    // beforeCreate() {
    //     console.log(12321)
    //     this.$store.dispatch('auth/getUser')
    // },
    // beforeCreate() {
    //     console.log(9999999)
    //     this.$store.dispatch('auth/getUser')
    // },
}
</script>
