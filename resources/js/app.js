require('./bootstrap');
window.Vue = require('vue')
import router from './router'
import store from './store/store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
import common from './common'
Vue.mixin(common)

require('./store/subscriber')

Vue.component('mainapp', require('./components/mainapp.vue').default)

store.dispatch('auth/attempt', {token: localStorage.getItem('token'), user: JSON.parse(localStorage.getItem('user'))}).then(() => {    
    const app = new Vue({
        el: '#app',
        router,
        store
    })
})
