import { useEffect } from 'react'
import Word from './word'
import { A } from './utils'
import { infoDialog } from '../scripts/dialog'
import type { ILetter } from '../types'

interface IExample {
  word: ILetter[]
  desc: string
}

const examples: IExample[] = [
  {
    word: 'weary'.split('').map((value) => ({
      value,
      state: value === 'w' ? 'correct' : 'initial',
    })),
    desc: 'The letter <strong>W</strong> is in the word and in the correct spot.',
  },
  {
    word: 'pills'.split('').map((value) => ({
      value,
      state: value === 'i' ? 'present' : 'initial',
    })),
    desc: 'The letter <strong>I</strong> is in the word but in the wrong spot.',
  },
  {
    word: 'vague'
      .split('')
      .map((value) => ({ value, state: value === 'u' ? 'absent' : 'initial' })),
    desc: 'The letter <strong>U</strong> is not in the word in any spot.',
  },
]

export default function Info() {
  useEffect(() => {
    infoDialog.target?.addEventListener(
      'click',
      infoDialog.closeOnBackdropClick
    )

    return () => {
      infoDialog.target?.removeEventListener(
        'click',
        infoDialog.closeOnBackdropClick
      )
    }
  }, [])
  return (
    <>
      <header>
        <h1>How To Play</h1>
        <button
          type="button"
          title="close"
          onClick={() => {
            infoDialog.close()
          }}>
          &times;
        </button>
      </header>
      <article className="instructions">
        <ul>
          <li>
            Guess the <strong>WORDLE</strong> in six tries.
          </li>
          <li>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </li>
          <li>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </li>
        </ul>
        <section aria-labelledby="section-example">
          <h2 id="section-example">Example &#8212;</h2>
          {examples.map((example, i) => (
            <div key={i}>
              <Word value={example.word} tag={'example'} />
              <h3 dangerouslySetInnerHTML={{ __html: example.desc }} />
            </div>
          ))}
        </section>
      </article>
      <footer>
        <p>
          This is an simple open-source clone of word guessing game{' '}
          <A href="https://www.powerlanguage.co.uk/wordle">Wordle</A>.
        </p>
        <p>
          Check out source code{' '}
          <A href="https://github.com/sid7/wordle-clone">here</A>
        </p>
      </footer>
    </>
  )
}
