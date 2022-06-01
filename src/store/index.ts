import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { RootState } from '@/types'
import fetchStore from '@/store/fetchStore'
import sentenceStore from '@/store/sentenceStore'
import { InjectionKey } from 'vue'

export const key: InjectionKey<Store<RootState>> = Symbol()

export default createStore<RootState>({
  modules: {
    fetchStore,
    sentenceStore,
  },
})

export function useStore() {
  return baseUseStore(key)
}
