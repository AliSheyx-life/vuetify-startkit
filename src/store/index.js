import { createStore } from 'vuex'
import ui from './ui'
import users from './users'

const store = createStore({
  state () {},
  getters: {},
  mutations: {},
  actions: {},
  // modules
  modules: {
    ui,
    users,
  }
})

export default store