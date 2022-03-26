const pad = [
  { keys: 'qwertyuiop'.split('') },
  { keys: 'asdfghjkl'.split(''), spacer: 1 },
  { keys: 'zxcvbnm'.split(''), spacer: 2 },
  { keys: ['Enter', 'Backspace'] },
]

export default function Keypad() {
  return (
    <section id="keypad" aria-label="keypad">
      {pad.map(({ keys, spacer }) => (
        <div className="lane">
          {spacer && <span style={{ flex: 0.5 * spacer }} aria-hidden />}
          {keys.map((key) => (
            <button type="button" className="key" data-key={key} key={key}>
              {key}
            </button>
          ))}
          {spacer && <span style={{ flex: 0.5 * spacer }} aria-hidden />}
        </div>
      ))}
    </section>
  )
}
