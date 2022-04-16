import { useEffect } from 'react'
import { keypress } from '../scripts/helper'
import type { IGameState } from '../types'
import type { IHandle } from '../hooks/game'

const pad = [
  { keys: 'qwertyuiop'.split('') },
  { keys: 'asdfghjkl'.split(''), spacer: 1 },
  { keys: 'zxcvbnm'.split(''), spacer: 2 },
  { keys: ['Enter', 'Backspace'] },
]

interface IKeypad extends Pick<IGameState, 'hints'> {
  handle: IHandle
}
export default function Keypad({ handle, hints }: IKeypad) {
  useEffect(() => {
    document.addEventListener('keydown', keypress)
    document.addEventListener('keyup', keypress)
    return () => {
      document.addEventListener('keydown', keypress)
      document.addEventListener('keyup', keypress)
    }
  }, [])
  return (
    <section id="keypad" aria-label="keypad">
      {pad.map(({ keys, spacer }, i) => (
        <div className="lane" key={i}>
          {spacer && <span style={{ flex: 0.5 * spacer }} aria-hidden />}
          {keys.map((key) => (
            <button
              type="button"
              className="key"
              data-key={key}
              data-mark={hints[key]}
              onClick={() => {
                if (key === 'Enter') {
                  handle.submit()
                } else if (key === 'Backspace') {
                  handle.del()
                } else {
                  handle.addLetter(key)
                }
              }}
              key={key}>
              {key}
            </button>
          ))}
          {spacer && <span style={{ flex: 0.5 * spacer }} aria-hidden />}
        </div>
      ))}
    </section>
  )
}
