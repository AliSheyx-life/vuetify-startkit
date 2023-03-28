import { fetchAllUsers, createUser } from "../../api/users";

export default {
    state: {
        usersList: [],
    }, 
    getters: {
        GET_USERS_LIST: s => s.usersList
    },
    mutations: {
        SET_USERS_LIST(s, data) {
            s.usersList = data
        }
    },
    actions: {
        async FETCH_ALL_USERS({ commit }) {
           const res = await fetchAllUsers();
           commit('SET_USERS_LIST', res.data)
        },
        async CREATE_USER(_, data) {
            return await createUser(data);
        }
    },
    // 
    namespaced: true
}