<template>
  <v-app-bar
    app
  >
    <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
    <v-app-bar-nav-icon
      class=".d-flex "
      @click="$emit('drawer')"
    />
    <v-spacer />
    <v-btn
        v-if="!isLogin"
      icon
      router
      :to="{name:'Login',params:{route:$route.name}}"
    >
        로그인
<!--      <v-icon dense>-->
<!--        mdi-account-->
<!--      </v-icon>-->
    </v-btn>
      <v-menu offset-y v-if="isLogin">
          <template v-slot:activator="{ on, attrs }">
          <v-list-item-action-text
              v-bind="attrs"
              v-on="on"
              flat
              class="text-h8"
          >

              {{userInfo.username}} 님
          </v-list-item-action-text>
          </template>
          <v-list>
<!--              <v-list-item>-->
<!--                  <v-list-tile>-->
<!--                      <v-list-tile-title>마이페이지</v-list-tile-title>-->
<!--                  </v-list-tile>-->
<!--              </v-list-item>-->
<!--              <v-list-item @click="logout({refresh_token})">-->
              <v-list-item @click="$store.dispatch('auth/logout')">

<!--                      <v-list-tile-title>로그아웃</v-list-tile-title>-->
                  <v-list-item-content>
                      <v-list-item-title>로그아웃</v-list-item-title>
                  </v-list-item-content>

              </v-list-item>
          </v-list>
      </v-menu>
  </v-app-bar>
</template>
<script>
import {mapState, mapGetters, mapActions} from "vuex"
//loginData
export default {
    name: 'DefaultBar',
    computed:{
        ...mapState('auth',["isLogin","userInfo"]),
        ...mapGetters('auth',{
            authData:'loginData'
        }),
        // isLogin() {
        //     return this.authData
        //     // this.authData
        // },

    },
}
</script>
<style lang="">

</style>
