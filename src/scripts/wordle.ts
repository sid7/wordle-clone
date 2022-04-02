import { ANSWERS, ALLOWED_GUESSES } from '../constants'
import type { ILetter } from '../types'

const msInDay = 1000 * 60 * 60 * 24

abstract class Eval {
  currentWord!: string

  private getWord(word: ILetter[]) {
    return word.map((a) => a.value).join('')
  }

  isValidWord(_word: ILetter[]) {
    const word = this.getWord(_word)
    return ANSWERS.includes(word) || ALLOWED_GUESSES.includes(word)
  }

  private match(_word: ILetter[]): ILetter[] {
    const word = this.currentWord.split('')

    return _word.map(({ value }, i) => ({
      value,
      state:
        value === word[i]
          ? 'correct'
          : word.includes(value)
          ? 'present'
          : 'absent',
    }))
  }

  eval(_word: ILetter[]): { exactMatch: boolean; letters: ILetter[] } {
    const word = this.getWord(_word)

    if (word === this.currentWord) {
      return {
        exactMatch: true,
        letters: _word.map(({ value }) => ({ value, state: 'correct' })),
      }
    }

    return {
      exactMatch: false,
      letters: this.match(_word),
    }
  }
}

class Wordle extends Eval {
  base: number
  day: number
  catch = new Map<number, string>()

  constructor() {
    super()
    this.base = new Date(1640995200000).valueOf()
    this.day = Date.now()

    const offset = this.day - this.base
    const seed = Math.floor(offset / msInDay)

    this.currentWord = ANSWERS[seed]
    this.catch.set(seed, this.currentWord)
  }

  setNewRandomWord(): void {
    const seed = Math.round(Math.random() * ANSWERS.length)

    if (this.catch.has(seed)) {
      return this.setNewRandomWord()
    }

    this.currentWord = ANSWERS[seed]
  }
}

export const wordle = new Wordle()
