import { ILetter } from '../types'

export function createBoard(row: number, col: number): ILetter[][] {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => ({
      value: '',
      state: 'initial',
    }))
  )
}

export const wordIs = (index: number, currentWordIndex: number) =>
  index === currentWordIndex
    ? 'current'
    : index > currentWordIndex
    ? 'blank'
    : 'attempt'
