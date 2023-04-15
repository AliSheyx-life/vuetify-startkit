import * as invoceApi from "@/api/invoice";

export default {
  state: {
    invoices: [],
  },
  getters: {
    GET_INVOICES: (s) => s.invoices,
  },
  mutations: {
    SET_INVOICES(s, data) {
      s.invoices = data;
    },
  },
  actions: {
    async CREATE_INVOICE(_, data) {
      return await invoceApi.createInvoice(data);
    },
    async FETCH_INVOICES({ commit }, all = true) {
      const { data } = await invoceApi.getInvoices(all);
      commit("SET_INVOICES", data.data);
    },
    async DELETE_INVOICE(_, id) {
      return await invoceApi.deleteInvoice(id);
    },
    async EDIT_INVOICE(_, data) {
      console.log("store: ", data.id);
      return await invoceApi.editInvoice(data);
    },
  },
  //
  namespaced: true,
};
