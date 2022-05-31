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

export interface State {
  responseStatus: 'pending' | 'fulfilled' | 'rejected' | null
  loading: boolean
  error: unknown | null

  sentences: SentenceObject[]
  currentSentence: SentenceObject
  sentenceToCheck: string
  startWords: DragItem[]
  targetWords: DragItem[]
}
