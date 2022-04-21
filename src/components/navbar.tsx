import ThemeSwitcher from './theme-switcher'
import { infoDialog } from '../scripts/dialog'

export default function Navbar() {
  return (
    <aside>
      <button
        type="button"
        className="btn"
        onClick={() => {
          infoDialog.open()
        }}>
        Help
      </button>
      <a href={import.meta.env.BASE_URL}>Wordle-Clone</a>
      <ThemeSwitcher />
    </aside>
  )
}
