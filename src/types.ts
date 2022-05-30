type Languages = 'ru' | 'en'

export type DragItem = {
  id: number
  text: string
}

export type SentenceObject = {
  [key in Languages]: string
}

export interface SentenceAllResponse {
  data: {
    sentenceAll: SentenceObject[]
  }
}
