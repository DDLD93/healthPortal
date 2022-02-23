import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

const socket = io("http://localhost:4000");

Vue.use(VueSocketIOExt, socket, { store })
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')