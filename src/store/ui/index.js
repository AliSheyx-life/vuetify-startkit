export default {
    state: {
        isCollapsed: false
    },
    getters: {
        IS_COLLAPSED: s => s.isCollapsed
    },
    mutations: {
        SET_SIDEBAR_STATE(s, data) {
            s.isCollapsed = data
        }
    },
    actions: {
        GET_SIDEBAR_STATE({ commit }) {
            let data = localStorage.getItem('sidebar-ui')
            if(data === null) return null
            data = JSON.parse(data)
            commit('SET_SIDEBAR_STATE', data)
            if(data) return true
            return false
        },
        TOGGLE_SIDEBAR({ commit }) {
            let data = localStorage.getItem('sidebar-ui')
            data = JSON.parse(data)
            if(data) {
                commit('SET_SIDEBAR_STATE', false)
                localStorage.setItem('sidebar-ui', false)
            } else {
                commit('SET_SIDEBAR_STATE', true)
                localStorage.setItem('sidebar-ui', true)
            }
        }
    },

    namespaced: true
}