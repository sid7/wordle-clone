import { useReducer } from 'react'
import { CONFIG } from '../constants'
import { createBoard, msg, pickLetterState } from '../scripts/helper'
import { wordle } from '../scripts/wordle'
import type { IGameState } from '../types'

if (!(window as any).wordle) {
  ;(window as any).wordle = wordle
}

const initialState: IGameState = {
  board: createBoard(CONFIG.max_attempts, CONFIG.word_length),
  hints: {},
  position: { row: 0, col: 0 },
  status: 'running',
  msg: { text: 'Make your first guess', type: 'initial' },
}

export type IAction =
  | { type: 'add-letter'; letter: string }
  | { type: 'del-letter' | 'submit' | 'new-round' }

function reducer(state: IGameState, action: IAction): IGameState {
  function checkpoint(type: 'add' | 'del' | 'submit') {
    if (state.status !== 'running') {
      return true
    }

    switch (type) {
      case 'add':
        return state.position.col === CONFIG.word_length
      case 'del':
        return state.position.col === 0
      case 'submit':
        return (
          state.position.row === CONFIG.max_attempts || state.position.col === 0
        )
    }
  }

  switch (action.type) {
    case 'add-letter': {
      if (checkpoint('add')) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }
      const { status, hints } = state

      board[pos.row][pos.col].value = action.letter
      if (pos.col < CONFIG.word_length) {
        pos.col += 1
      }

      return { board, position: pos, msg: null, status, hints }
    }
    case 'del-letter': {
      if (checkpoint('del')) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }
      const { status, hints } = state

      pos.col -= 1
      board[pos.row][pos.col].value = ''
      return {
        board,
        position: pos,
        msg: null,
        status,
        hints,
      }
    }
    case 'submit': {
      if (checkpoint('submit')) {
        return state
      }

      if (state.position.col !== CONFIG.word_length) {
        return { ...state, msg: { text: 'Too Short', type: 'error' } }
      }

      if (!wordle.isValidWord(state.board[state.position.row])) {
        return { ...state, msg: { text: 'word not in list', type: 'error' } }
      }

      const newState = JSON.parse(JSON.stringify(state)) as IGameState

      const { board, position, hints } = newState
      const { isExactMatch, word } = wordle.eval(board[position.row])

      board[position.row] = word

      for (const letter of word) {
        hints[letter.value] =
          letter.value in hints
            ? pickLetterState(hints[letter.value], letter.state)
            : letter.state
      }

      if (isExactMatch) {
        newState.status = 'win'
        newState.msg = {
          text: msg.win(position.row),
          type: 'win',
        }
        return newState
      }

      position.row += 1
      position.col = 0

      if (position.row === CONFIG.max_attempts) {
        newState.status = 'lose'
        newState.msg = {
          text: msg.lose(wordle.currentWord),
          type: 'answer',
        }
      }

      return newState
    }
    case 'new-round': {
      const newState = JSON.parse(JSON.stringify(initialState)) as IGameState
      newState.msg = null
      newState.board = newState.board.map((word) =>
        word.map(() => ({ value: '', state: 'initial' }))
      )
      return newState
    }
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handle = {
    addLetter(letter: string) {
      dispatch({ type: 'add-letter', letter })
    },
    del() {
      dispatch({ type: 'del-letter' })
    },
    submit() {
      dispatch({ type: 'submit' })
    },
    newRound() {
      dispatch({ type: 'new-round' })
      wordle.setNewRandomWord()
    },
  }

  return { state, handle }
}

export type IHandle = ReturnType<typeof useGame>['handle']
