import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import firstPage from './components/pages/myFirstVuePage'
import newRoutePage from './components/pages/newRoutePage'
import hooks from './components/pages/basic/hooks.vue'
import methods from './components/pages/basic/methods.vue'

// Authentication Pages
import login from './admin/authentication/login'
import signup from './admin/authentication/signup'
import forgotpassword from './admin/authentication/forgotPassword'

// Project Pages
import home from './components/pages/home'
import tags from './admin/pages/tags'
import category from './admin/pages/category'
import store from './store/store'

const routes = [
    // authentication routes
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup
    },
    {
        path: '/forgot-password',
        name: 'forgotpassword',
        component: forgotpassword
    },

    // admin projects routes...
    {
        path: '/',
        name: 'dashboard',
        component: home,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }

            next()
        }
    },
    {
        path: '/tags',
        name: 'tags',
        component: tags,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }

            next()
        }
    },
    {
        path: '/categories',
        name: 'categories',
        component: category,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }

            next()
        }
    },
]

export default new Router({
    mode: 'history',
    routes
})