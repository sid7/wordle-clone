import type { ILetter } from '../types'

interface IWord {
  value: ILetter[]
  tag: string
}
export default function Word({ value, tag }: IWord) {
  return (
    <div className={`word is-${tag}`}>
      {value.map((letter, i) => (
        <span className="letter" data-state={letter.state} key={i}>
          {letter.value}
        </span>
      ))}
    </div>
  )
}
