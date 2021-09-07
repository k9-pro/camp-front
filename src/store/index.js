import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import auth from './auth';
import join from './join';
import error from './error';

export default new Vuex.Store({
    state: {
    },
    mutations: {

    },
    getters: {
        s3root () {
           return process.env.VUE_APP_S3_ROOT
        }
    },
    actions: {

    },
    modules: {
        auth,
        error,
        join,
    }
})
