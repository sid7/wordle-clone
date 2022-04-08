import { useReducer } from 'react'
import { CONFIG } from '../constants'
import { createBoard } from '../scripts/helper'
import { wordle } from '../scripts/wordle'
import type { IStatus } from '../types'

if (!(window as any).wordle) {
  ;(window as any).wordle = wordle
}

const initialState = {
  board: createBoard(CONFIG.max_attempts, CONFIG.word_length),
  position: { row: 0, col: 0 },
  status: 'running' as IStatus,
  error: null as string | null,
}

export type IGameState = typeof initialState
export type IAction =
  | { type: 'add-letter'; letter: string }
  | { type: 'del-letter' | 'submit' }

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
        console.log({ row: state.position.row })
        return state.position.row === CONFIG.max_attempts
    }
  }

  switch (action.type) {
    case 'add-letter': {
      if (checkpoint('add')) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }
      const { error, status } = state

      board[pos.row][pos.col].value = action.letter
      if (pos.col < CONFIG.word_length) {
        pos.col += 1
      }

      return { board, position: pos, error, status }
    }
    case 'del-letter': {
      if (checkpoint('del')) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }
      const { error, status } = state

      pos.col -= 1
      board[pos.row][pos.col].value = ''
      return {
        board,
        position: pos,
        error,
        status,
      }
    }
    case 'submit': {
      if (checkpoint('submit')) {
        return state
      }

      if (state.position.col !== CONFIG.word_length) {
        return { ...state, error: 'Too Short' }
      }

      if (!wordle.isValidWord(state.board[state.position.row])) {
        return { ...state, error: 'word not in list' }
      }

      const newState = JSON.parse(JSON.stringify(state)) as IGameState

      const { board, position } = newState
      const { isExactMatch, word } = wordle.eval(board[position.row])

      board[position.row] = word

      if (isExactMatch) {
        newState.status = 'win'
        return newState
      }

      position.row += 1
      position.col = 0

      if (position.row === CONFIG.max_attempts) {
        newState.status = 'lose'
        newState.error = wordle.currentWord
      }

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
  }

  return { state, handle }
}

export type IHandle = ReturnType<typeof useGame>['handle']
