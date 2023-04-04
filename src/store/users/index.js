import {
  fetchAllUsers,
  createUser,
  deleteUser,
  editUser,
  changePassword,
  changeProfilePhoto,
} from "../../api/users";

export default {
  state: {
    usersList: [],
  },
  getters: {
    GET_USERS_LIST: (s) => s.usersList,
  },
  mutations: {
    SET_USERS_LIST(s, data) {
      s.usersList = data;
    },
  },
  actions: {
    async FETCH_ALL_USERS({ commit }) {
      const res = await fetchAllUsers();
      commit("SET_USERS_LIST", res.data);
    },
    async CREATE_USER(_, data) {
      return await createUser(data);
    },
    async DELETE_USER(_, id) {
      return deleteUser(id);
    },
    async EDIT_USER(_, data) {
      return editUser(data);
    },
    async CHANGE_PASSWORD(_, data) {
      return changePassword(data);
    },
    async CHANGE_PROFILE_PHOTO(_, data) {
      return changeProfilePhoto(data);
    },
  },
  //
  namespaced: true,
};
