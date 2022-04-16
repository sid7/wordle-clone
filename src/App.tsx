import { useEffect, useRef } from 'react'
import Navbar from './components/navbar'
import Keypad from './components/keypad'
import Word from './components/word'
import useGame from './hooks/game'
import { wordIs } from './scripts/helper'

export default function App() {
  const { state, handle } = useGame()
  const newRound = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state.status === 'running') {
      newRound.current?.blur()
    } else {
      newRound.current?.focus()
    }
  }, [state.status])

  return (
    <>
      <Navbar />
      <section id="board" aria-label="wordle-board">
        {state.board.map((word, i) => (
          <Word value={word} tag={wordIs(i, state.position.row)} key={i} />
        ))}
      </section>
      <div className="ctrl">
        <p id="msg" className={state.msg?.type}>
          {state.msg?.text}
        </p>
        <button
          type="button"
          disabled={state.status === 'running'}
          aria-hidden={state.status === 'running'}
          ref={newRound}
          onClick={() => {
            handle.newRound()
          }}>
          New Round
        </button>
      </div>

      <Keypad handle={handle} hints={state.hints} />
    </>
  )
}
