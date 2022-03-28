import { useReducer } from 'react'
import { CONFIG } from '../constants'
import { createBoard } from '../scripts/helper'

const initialState = {
  board: createBoard(CONFIG.max_attempts, CONFIG.word_length),
  position: { row: 0, col: 0 },
}

export type IGameState = typeof initialState
export type IAction =
  | { type: 'add-letter'; letter: string }
  | { type: 'del-letter' }

function reducer(state: IGameState, action: IAction): IGameState {
  switch (action.type) {
    case 'add-letter': {
      if (state.position.col === CONFIG.word_length) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }

      board[pos.row][pos.col].value = action.letter
      if (pos.col < CONFIG.word_length) {
        pos.col += 1
      }

      return { board, position: pos }
    }
    case 'del-letter': {
      if (state.position.col === 0) {
        return state
      }

      const board = [...state.board]
      const pos = { ...state.position }

      pos.col -= 1
      board[pos.row][pos.col].value = ''
      return {
        board,
        position: pos,
      }
    }
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state }
}
