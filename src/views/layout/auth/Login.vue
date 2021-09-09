<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          width="356"
        >
          <v-card-text class="text-center px-8 py-8">
            <div class="text-h5 font-weight-black mb-10">
              <!-- <v-btn
                block
                text
                href="/"
                class="text-h3 font-weight-bold"
              >
                CAMP
              </v-btn> -->
              <router-link
                class="text-h3 font-weight-bold"
                :to="`/`"
                tag="button"
              >
                <v-icon
                  large
                >
                  mdi-tent
                </v-icon>
                KAMP9
              </router-link>
            </div>
            <v-text-field
              label="이메일"
              type="email"
              v-model="email"
              prepend-icon="mdi-email"
              @keyup.enter="$store.dispatch('auth/login',{email,password})"
            />
              <v-alert text :value="isLoginError.email" type="error" class="pa-0 text-left" >{{loginErrorMsg.email}}</v-alert>
            <v-text-field
              label="비밀번호"
              type="password"
              v-model="password"
              prepend-icon="mdi-lock-outline"
              @keyup.enter="$store.dispatch('auth/login',{email,password})"
            />
              <v-alert text :value="isLoginError.password" type="error" class="pa-0 text-left" >{{loginErrorMsg.password}}</v-alert>
            <v-btn
              block
              x-large
              depressed
              color="primary"
              class="mt-6"
              @click="$store.dispatch('auth/login',{email,password})"
            >
              로그인
            </v-btn>
            <v-btn
              block
              x-large
              depressed
              class="mt-6"
              color="grey lighten-1"
              router
              to="join"
            >
              회원가입
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState, mapActions} from "vuex"

export default {
    name: 'Login',
    data() {
        return {
            email:null,
            password:null,
        }
    },
    computed: {
      ...mapState('auth',["loginErrorMsg","isLoginError"])
    },

}

</script>
<style lang="">

</style>
