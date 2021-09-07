import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import store from './store'
// import tiptap from './plugins/tiptap'

Vue.config.productionTip = false

Vue.use( CKEditor );

new Vue({
    router,
    vuetify,
    CKEditor,
    store,
    render: h => h(App)
}).$mount('#app')
