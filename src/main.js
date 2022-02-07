import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false
axios.defaults.baseURL ='https://stiggu.pythonanywhere.com/api/v1/'

new Vue({
  router,
  vuetify,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
