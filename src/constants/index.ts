export * from './answers'
export * from './allowed-guesses'

export const THEME = 'theme'

export const CONFIG = {
  word_length: 5,
  max_attempts: 6,
}

export const MSG = {
  welcome: ['Make your first guess', 'Game on'],
  win: [
    ['Genius', 'Brilliant'],
    ['Magnificent', 'Spectacular', 'excellent'],
    ['Impressive', 'Awesome'],
    ['Splendid', 'Superb'],
    ['Great'],
    ['Phew'],
  ],
  lose: ['Try another round', 'Better luck next time'],
}
