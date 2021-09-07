<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          width="356"
        >
          <v-card-text class="text-center px-8 py-8">
            <div class="text-h5 font-weight-black mb-10">
              회원가입
            </div>
              <v-text-field
                  label="닉네임"
                  v-model="username"
                  prepend-icon="mdi-account"
              />
              <v-alert text :value="joinValidate.username ? true : false" type="error" class="pa-0 text-left" >{{joinValidate.username}}</v-alert>
            <v-text-field
              label="이메일"
              v-model="email"
              prepend-icon="mdi-email"
            />
              <v-alert text :value="joinValidate.email ? true : false" type="error" class="pa-0 text-left" >{{joinValidate.email}}</v-alert>
            <v-text-field
              label="비밀번호"
              v-model="password1"
              type="password"
              prepend-icon="mdi-lock-outline"
            />
              <v-alert text :value="joinValidate.password1 ? true : false" type="error" class="pa-0 text-left" >{{joinValidate.password1}}</v-alert>
            <v-text-field
              label="비밀번호 확인"
              v-model="password2"
              type="password"
              prepend-icon="mdi-lock-outline"
            />
              <v-alert text :value="joinValidate.password2 ? true : false" type="error" class="pa-0 text-left" >{{joinValidate.password2}}</v-alert>
            <v-btn
              block
              x-large
              color="primary"
              class="mt-6"
              @click="$store.dispatch('join/join',{username,email,password1,password2})"
            >
              가입하기
            </v-btn>
            <v-btn
              block
              x-large
              color="error"
              class="mt-6"
              router
              to="/"
            >
              홈으로
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
    name: 'Join',
    data() {
        return {
          username: null,
          email: null,
          password1: null,
          password2: null,
        }
    },
    computed: {
        ...mapState('join',["joinValidate"])
    },
}
</script>
<style lang="">

</style>
