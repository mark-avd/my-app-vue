import { DragItem } from '@/types'

export const makeArrayWithIds = (wordsArray: string[]): DragItem[] => {
  const arrayWithIds: DragItem[] = []
  wordsArray.map((word, index) => {
    arrayWithIds.push({ id: index, text: word })
  })
  return arrayWithIds
}
