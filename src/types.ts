export type ILetterState = 'initial' | 'correct' | 'present' | 'absent'

export interface ILetter {
  value: string
  state: ILetterState
}
