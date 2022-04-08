export type ILetterState = 'initial' | 'correct' | 'present' | 'absent'

export interface ILetter {
  value: string
  state: ILetterState
}

export type IStatus = 'running' | 'win' | 'lose'
