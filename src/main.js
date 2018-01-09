// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import App from './App'
import Game from './components/game'
import Home from './pages/Home'
// import router from './router'

import store from './vuex/store'

Vue.use(VueResource)
// for cors
Vue.http.interceptors.push((request, next) => {
  if (!/https:\/\/api.github.com/.test(request.url)) {
    request.credentials = true
  }
  next()
})

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  template: '<App/>',
  components: { App, Game, Home }
})
