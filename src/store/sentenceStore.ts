import { Module } from 'vuex'
import { makeArrayWithIds } from '@/utils/makeArrayWithIds'
import { shuffleArray } from '@/utils/shuffleArray'
import { DragItem, RootState, SentenceObject, SentenceState } from '@/types'
import { LOADING_DURATION, NEW_SENTENCE_DELAY, STATUS_DISPLAY_DURATION } from '@/constants'

const sentenceStore: Module<SentenceState, RootState> = {
  state: {
    sentences: [],
    currentSentence: { ru: '', en: '' },
    sentenceToCheck: '',
    initialWords: [],
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
      state.initialWords = wordsArray
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
        dispatch('changeCurrentSentence').then(() => dispatch('makeStartWords'))
      }, NEW_SENTENCE_DELAY)
      setTimeout(() => commit('setLoading', false), LOADING_DURATION)
    },
    checkSentence(
      { state, commit, dispatch },
      payload: {
        setStatus: (value: boolean) => void
        setShowStatus: (show: boolean) => void
      }
    ) {
      commit('setSentenceToCheck', state.targetWords.map((word: DragItem) => word.text).join(' '))
      if (state.sentenceToCheck !== state.currentSentence.en) {
        payload.setStatus(false)
      }
      if (state.sentenceToCheck === state.currentSentence.en) {
        const utterThis = new SpeechSynthesisUtterance(state.sentenceToCheck)
        utterThis.lang = 'en-US'
        payload.setStatus(true)
        dispatch('renderNewSentence')
        if (!speechSynthesis.speaking) {
          speechSynthesis.speak(utterThis)
        }
      }
      payload.setShowStatus(true)
      setTimeout(() => payload.setShowStatus(false), STATUS_DISPLAY_DURATION)
    },
  },
}

export default sentenceStore
