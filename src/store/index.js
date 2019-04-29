import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      username: localStorage.getItem("username") || "",
      realname: localStorage.getItem("realname") || ""
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

  }
})
export default store;