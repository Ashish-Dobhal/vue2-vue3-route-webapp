import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

// Global CSS or Styles
// import './assets/global.css'

// Vue Configuration
Vue.config.productionTip = false

// Vue Instance Creation
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
