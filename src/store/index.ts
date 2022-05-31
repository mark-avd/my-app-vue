import { createStore } from 'vuex'
import { fetchGraphQL } from '@/services/api'
import { makeArrayWithIds } from '@/utils/makeArrayWithIds'
import { shuffleArray } from '@/utils/shuffleArray'
import { DragItem, SentenceObject, State } from '@/types'

export default createStore<State>({
  state: {
    loading: false,
    error: null,
    responseStatus: null,
    sentences: [],
    currentSentence: { ru: '', en: '' },
    sentenceToCheck: '',
    startWords: [],
    targetWords: [],
  },
  getters: {
    getRandomSentenceIndex(state) {
      return Math.floor(Math.random() * state.sentences.length)
    },
    getWordsArray(state) {
      return makeArrayWithIds(state.currentSentence.en.split(' '))
    },
  },
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
    changeCurrentSentence({ state, commit, getters }) {
      commit('setCurrentSentence', state.sentences[getters.getRandomSentenceIndex])
    },
    makeStartWords({ commit, getters }) {
      commit('setStartWords', shuffleArray(getters.getWordsArray))
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
        payload.setCorrect(false)
      }
      if (state.sentenceToCheck === state.currentSentence.en) {
        const utterThis = new SpeechSynthesisUtterance(state.sentenceToCheck)
        utterThis.lang = 'en-US'
        payload.setCorrect(true)
        dispatch('renderNewSentence')
        if (!speechSynthesis.speaking) {
          speechSynthesis.speak(utterThis)
        }
      }
      payload.setShowStatus(true)
      setTimeout(() => payload.setShowStatus(false), 1500)
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
