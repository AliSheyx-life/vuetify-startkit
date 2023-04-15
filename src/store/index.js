import { createStore } from "vuex";
import ui from "./ui";
import users from "./users";
import status from "./status";
import invoice from "./invoice";

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
    invoice,
  },
});

export default store;
