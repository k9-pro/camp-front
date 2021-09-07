import {setAccount} from '@/restApi/auth/account.js'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        joinValidate:{
            username: null,
            email:null,
            password1:null,
            password2:null,
        },
    },
    mutations: {
        joinSuccess(state,payload) {
            state.joinValidate.username = null
            state.joinValidate.email = null
            state.joinValidate.password1 = null
            state.joinValidate.password2 = null
            alert('회원가입이 완료 되었습니다.')
            router.push({name:'Dashboard'})
        },
        joinFail(state,payload) {
            // console.log(payload)
            state.joinValidate.username = null
            state.joinValidate.email = null
            state.joinValidate.password1 = null
            state.joinValidate.password2 = null

            for(const key in payload) {
                if(key == 'non_field_errors') {
                    state.joinValidate.password1 = payload[key][0]
                    state.joinValidate.password2 = payload[key][0]
                } else {
                    state.joinValidate[key] = payload[key][0]
                }
            }

        }
    },
    actions: {
        join({commit}, payload) {
            const request = []

            request.username = payload.username
            request.email = payload.email
            request.password1 = payload.password1
            request.password2 = payload.password2

            setAccount({data: request}).then(response => {
                // console.log(response.data)
                localStorage.setItem('login', JSON.stringify({
                    access_token:response.data.access_token,
                    refresh_token:response.data.refresh_token
                }))
                commit('joinSuccess', response)
            }).catch(error => {
                const res = error.response.data
                commit('joinFail', res)
            })
        }
    }
}
