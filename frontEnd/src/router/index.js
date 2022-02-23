import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showHeader: true,
            requiresAuth: true,
        },
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            showHeader: true,
            requiresAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    },
    {
        path: '/user',
        name: 'User',
        component: () =>
            import ( /* webpackChunkName: "User" */ '../views/Users.vue'),
        meta: {
            showHeader: true,
            requiresAuth: true,
        },
    },
    {
        path: '/form',
        name: 'Form',
        component: () =>
            import ( /* webpackChunkName: "Form" */ '../views/Form.vue'),
        meta: {
            showHeader: true,
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/Login.vue'),
        meta: {
            showHeader: false,
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ( /* webpackChunkName: "Register" */ '../views/Register.vue'),
        meta: {
            showHeader: false,
            requiresAuth: false,
        },
    }
]

const router = new VueRouter({
    routes
})

//  Working Route Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (requiresAuth && !store.state.token) {
        next('/login')
    } else {
        next()
    }
})

export default router