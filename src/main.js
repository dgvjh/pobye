import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import Axios from './assets/js/axios'
import Time from './assets/js/time'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueCookie)
Vue.prototype.$axios = Axios
Vue.prototype.$time = Time

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
