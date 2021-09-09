import {login,logout,getUser} from '@/restApi/auth/login.js'
import router from '@/router'
export default {
    namespaced : true,
    state: {
        isLogin: localStorage.getItem('login') ? true : false,
        userInfo: null,
        userid:0,
        isLoginError:{
            email:false,
            password:false,
        },
        loginErrorMsg:{
            email:null,
            password:null
        },
    },
    getters: {
        loginData: state => {
            return state.userInfo
        }
    },
    mutations: {
        // 로그인 성공
        loginSuccess(state,payload) {
            // 로컬스토리지에 토큰 저장
            state.isLogin = true
            // state.userInfo = payload.user
            state.userInfo = payload.data
            state.userid = payload.data.id

            // router.back()
        },
        // 로그인 실패
        loginError(state,payload) {
            // console.log(res)
            state.isLoginError.email = false
            state.isLoginError.password = false
            for(const key in payload) {
                // 이메일 validate
                if(key == 'email') {
                    state.isLoginError.email = true
                    state.loginErrorMsg.email = payload[key][0]
                }
                // 패스워드 validate
                if(key == 'password') {
                    state.isLoginError.password = true
                    state.loginErrorMsg.password = payload[key][0]
                }
                // 이메일 & 비밀번호 validate
                if(key == 'non_field_errors') {
                    alert(payload[key][0]);
                }
            }
        },
        // 로그아웃 성공
        logoutSuccess(state) {
            // 로컬스토리지에 토큰 저장
            state.isLogin = false
            state.userInfo = null
            localStorage.removeItem('login')
            router.go("/")
        },
    },
    actions: {
        // 로그인 시도
        login({commit,dispatch}, payload) {
            const request = []

            request.email = payload.email
            request.password = payload.password

            login({data: request}).then(response => {
                // console.log(response.data)
                localStorage.setItem('login', JSON.stringify({
                    access_token:response.data.access_token,
                    refresh_token:response.data.refresh_token
                }))
                dispatch('getUser')
                router.back()
                // commit('loginSuccess',response.data)
            }).catch(error => {
                const res = error.response.data
                commit('loginError',res)
            })
        },
        logout({state,commit}, payload) {
            logout({
                    refresh:JSON.parse(localStorage.getItem('login')).refresh_token
                }).then(response => {
                commit('logoutSuccess')
            }).catch(error => {
                alert('로그아웃에 실패 하였습니다.')
            })
        },
        async getUser({commit,state}) {
            if(localStorage.getItem('login')) {
                const getData = await getUser().then(response => {
                    commit('loginSuccess',response)
                }).catch(error => {
                    localStorage.removeItem('login')
                })
            } else {
                state.userInfo = null
                state.userid = 0
                state.isLogin = false
            }
        }
    },

}
