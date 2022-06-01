import { Module } from 'vuex'
import { fetchGraphQL } from '@/services/api'
import { FetchState, RootState } from '@/types'

const fetchStore: Module<FetchState, RootState> = {
  state: {
    loading: false,
    error: null,
    responseStatus: null,
  },
  getters: {},
  mutations: {
    setResponseStatus(state, status: 'pending' | 'fulfilled' | 'rejected' | null) {
      state.responseStatus = status
    },
    setError(state, error: unknown) {
      state.error = error
    },
    setLoading(state, status: boolean) {
      state.loading = status
    },
  },
  actions: {
    async fetchSentences({ commit }) {
      commit('setResponseStatus', 'pending')
      commit('setLoading', true)

      try {
        const response = await fetchGraphQL()
        commit('setSentences', response.data.sentenceAll)
        commit('setResponseStatus', 'fulfilled')
      } catch (error: unknown) {
        commit('setError', error)
        commit('setResponseStatus', 'rejected')
      } finally {
        commit('setLoading', false)
      }
    },
  },
}

export default fetchStore
