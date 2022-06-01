type Languages = 'ru' | 'en'

export type SentenceObject = {
  [key in Languages]: string
}

export interface SentenceAllResponse {
  data: {
    sentenceAll: SentenceObject[]
  }
}

export type DragItem = {
  id: number
  text: string
}

export interface RootState {
  fetchStore: FetchState
  sentenceStore: SentenceState
}

export interface FetchState {
  responseStatus: 'pending' | 'fulfilled' | 'rejected' | null
  loading: boolean
  error: unknown | null
}

export interface SentenceState {
  sentences: SentenceObject[]
  currentSentence: SentenceObject
  sentenceToCheck: string
  initialWords: DragItem[]
  targetWords: DragItem[]
}
