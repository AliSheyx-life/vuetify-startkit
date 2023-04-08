import * as statusApi from "@/api/status";

export default {
  state: {
    statuses: [],
  },
  getters: {
    GET_STATUSES: (s) => s.statuses,
  },
  mutations: {
    SET_STATUSES(state, data) {
      state.statuses = data;
    },
  },
  actions: {
    async CREATE_STATUS(_, data) {
      return await statusApi.createStatus(data);
    },
    async FETCH_STATUSES({ commit }) {
      const data = await statusApi.getStatuses();
      commit("SET_STATUSES", data.data);
    },
    async DELETE_STATUS(_, id) {
      await statusApi.deleteStatus(id);
    },
  },
  //
  namespaced: true,
};
