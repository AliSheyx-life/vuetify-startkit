import { createStore } from "vuex";
import ui from "./ui";
import users from "./users";
import status from "./status";

const store = createStore({
  state() {},
  getters: {},
  mutations: {},
  actions: {},
  // modules
  modules: {
    ui,
    users,
    status,
  },
});

export default store;
