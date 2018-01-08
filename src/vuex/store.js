
import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = true
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    game
  },
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
