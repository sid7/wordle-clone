export type ILetterState = 'initial' | 'correct' | 'present' | 'absent'

export interface ILetter {
  value: string
  state: ILetterState
}

export type IStatus = 'running' | 'win' | 'lose'

export type IMsgType = 'initial' | 'error' | 'win' | 'answer'
export interface IGameState {
  board: ILetter[][]
  hints: {
    [key: string]: ILetterState
  }
  position: {
    row: number
    col: number
  }
  status: IStatus
  msg: {
    text: string
    type: IMsgType
  } | null
}
