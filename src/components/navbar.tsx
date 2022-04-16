import ThemeSwitcher from './theme-switcher'

export default function Navbar() {
  return (
    <aside>
      <a href={import.meta.env.BASE_URL}>Wordle-Clone</a>
      <ThemeSwitcher />
    </aside>
  )
}
