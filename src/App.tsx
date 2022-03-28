import Navbar from './components/navbar'
import Keypad from './components/keypad'
import Word from './components/word'
import useGame from './hooks/game'
import { wordIs } from './scripts/helper'

export default function App() {
  const { state } = useGame()

  return (
    <>
      <Navbar />
      <section id="board" aria-label="wordle-board">
        {state.board.map((word, i) => (
          <Word value={word} tag={wordIs(i, state.position.row)} key={i} />
        ))}
      </section>
      <Keypad />
    </>
  )
}
