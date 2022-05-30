import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { fetchGraphQL } from '@/services/api'
import { makeArrayWithIds } from '@/utils/makeArrayWithIds'
import { shuffleArray } from '@/utils/shuffleArray'
import { DragItem, SentenceObject } from '@/types'

export interface State {
  responseStatus: 'pending' | 'fulfilled' | 'rejected' | null
  loading: boolean | null
  error: unknown | null

  sentences: SentenceObject[]
  currentSentence: SentenceObject
  sentenceToCheck: string
  startWords: DragItem[]
  targetWords: DragItem[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    loading: null,
    error: null,
    responseStatus: null,
    sentences: [],
    currentSentence: { ru: '', en: '' },
    sentenceToCheck: '',
    startWords: [],
    targetWords: [],
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
    setSentences(state, sentences: SentenceObject[]) {
      state.sentences = sentences
    },
    setCurrentSentence(state, sentence: SentenceObject) {
      state.currentSentence = sentence
    },
    setSentenceToCheck(state, sentence: string) {
      state.sentenceToCheck = sentence
    },
    setStartWords(state, wordsArray: DragItem[]) {
      state.startWords = wordsArray
    },
    setTargetWords(state, wordsArray: DragItem[]) {
      state.targetWords = wordsArray
    },
  },
  actions: {
    changeCurrentSentence({ state, commit }) {
      const randomSentenceIndex = Math.floor(Math.random() * state.sentences.length)
      commit('setCurrentSentence', state.sentences[randomSentenceIndex])
    },
    makeStartWords({ state, commit }) {
      const words = state.currentSentence.en.split(' ')
      const wordsArray = makeArrayWithIds(shuffleArray(words))
      commit('setStartWords', wordsArray)
    },
    renderNewSentence({ commit, dispatch }) {
      setTimeout(() => {
        commit('setLoading', true)
        commit('setTargetWords', [])
        dispatch('changeCurrentSentence')
        dispatch('makeStartWords')
      }, 2000)
      setTimeout(() => commit('setLoading', false), 3000)
    },
    checkSentence({ state, commit, dispatch }, payload) {
      commit('setSentenceToCheck', state.targetWords.map((word: DragItem) => word.text).join(' '))
      if (state.sentenceToCheck !== state.currentSentence.en) {
        payload.isCorrect.value = false
      }
      if (state.sentenceToCheck === state.currentSentence.en) {
        const utterThis = new SpeechSynthesisUtterance(state.sentenceToCheck)
        utterThis.lang = 'en-US'
        payload.isCorrect.value = true
        dispatch('renderNewSentence')
        if (!speechSynthesis.speaking) {
          speechSynthesis.speak(utterThis)
        }
      }
      payload.showStatus.value = true
      setTimeout(() => (payload.showStatus.value = false), 1500)
    },
    sortStartWords({ state, commit }) {
      commit(
        'setStartWords',
        state.startWords.sort((a, b) => a.id - b.id)
      )
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
