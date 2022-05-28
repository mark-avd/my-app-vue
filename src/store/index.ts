import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { fetchGraphQL } from '@/services/api'
import { ItemT, SentenceObjectT } from '@/types'
import { makeArrayWithIds } from '@/utils/makeArrayWithIds'
import { shuffleArray } from '@/utils/shuffleArray'

export interface State {
  responseStatus: 'pending' | 'fulfilled' | 'rejected' | null
  loading: boolean | null
  error: unknown | null

  sentences: SentenceObjectT[]
  currentSentence: SentenceObjectT
  sentenceToCheck: string | undefined
  startWords: ItemT[]
  targetWords: ItemT[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    loading: null,
    error: null,
    responseStatus: null,
    sentences: [],
    currentSentence: { ru: '', en: '' },
    sentenceToCheck: undefined,
    startWords: [],
    targetWords: [],
  },
  getters: {},
  mutations: {
    setResponseStatus(state, status: 'pending' | 'fulfilled' | 'rejected' | null) {
      state.responseStatus = status
    },
    setLoading(state, status: boolean) {
      state.loading = status
    },
    setError(state, error: unknown) {
      state.error = error
    },
    setSentences(state, sentences: SentenceObjectT[]) {
      state.sentences = sentences
    },
    setCurrentSentence(state, sentence: SentenceObjectT) {
      state.currentSentence = sentence
    },
    setTargetWords(state, wordsArray: ItemT[]) {
      state.targetWords = wordsArray
    },
    setStartWords(state, wordsArray: ItemT[]) {
      state.startWords = wordsArray
    },
    setSentenceToCheck(state) {
      state.sentenceToCheck = state.targetWords.map((word) => word.text).join(' ')
    },
  },
  actions: {
    makeStartWords({ state, commit }) {
      const words = state.currentSentence.en.split(' ')
      const wordsArray = makeArrayWithIds(shuffleArray(words))
      commit('setStartWords', wordsArray)
    },
    changeCurrentSentence({ state, commit }) {
      const randomSentenceIndex = Math.floor(Math.random() * state.sentences.length)
      commit('setCurrentSentence', state.sentences[randomSentenceIndex])
    },
    async fetchSentences({ commit }) {
      commit('setResponseStatus', 'pending')
      commit('setLoading', true)

      try {
        const response = await fetchGraphQL()
        commit('setSentences', response.data.sentenceAll)
        commit('setResponseStatus', 'fulfilled')
        commit('setLoading', false)
      } catch (error: unknown) {
        commit('setResponseStatus', 'rejected')
        commit('setError', error)
        commit('setLoading', false)
      }
    },
  },
  modules: {},
})

export function useStore() {
  return baseUseStore(key)
}
