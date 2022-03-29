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

export function keypress(e: KeyboardEvent) {
  const key = /Enter|Backspace|^[a-z]$/i.test(e.key)
    ? e.key
    : /delete/i.test(e.key)
    ? 'Backspace'
    : null
  if (key === null) {
    return
  }

  const button = document.querySelector<HTMLButtonElement>(
    `[data-key="${key}"i]`
  )!

  if (e.type === 'keydown') {
    button.setAttribute('data-pressed', '')
  } else if (e.type === 'keyup') {
    button.removeAttribute('data-pressed')
    button.click()
  }
}
