import { attempt } from "lodash";

export default {
    namespaced: true,

    state: {
        token: null,
        user: null
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_USER (state, user) {
            state.user = user
        }
    },

    actions: {
        signIn({ dispatch }, resultData) {
            return dispatch('attempt', resultData)
        },

        attempt({ commit }, data) {
            commit('SET_TOKEN', data.token)
            commit('SET_USER', data.user)
        },

        signOut({ commit }) {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        }
    }
}