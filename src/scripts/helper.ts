import { MSG } from '../constants'
import type { ILetter, ILetterState } from '../types'

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

const letterStates: ILetterState[] = ['correct', 'present', 'absent']

export const pickLetterState = (
  currentState: ILetterState,
  newState: ILetterState
) =>
  letterStates.indexOf(newState) < letterStates.indexOf(currentState)
    ? newState
    : currentState

export const random = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const msg = {
  win(level: number) {
    const msg = MSG.win[level][random(MSG.win[level].length - 1)]
    return `${msg}, You Won`
  },
  lose(ans: string) {
    const msg = MSG.lose[random(MSG.lose.length - 1)]
    return `${msg}, Answer: ${ans}`
  },
  welcome() {
    return MSG.welcome[random(MSG.welcome.length - 1)]
  },
}
