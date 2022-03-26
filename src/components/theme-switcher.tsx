import useTheme, { themes } from '../hooks/theme'
import type { ITheme } from '../hooks/theme'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()

  return (
    <select
      value={theme}
      onChange={(e) => {
        setTheme(e.currentTarget.value as ITheme)
      }}>
      {themes.map((t) => (
        <option value={t} key={t}>
          {t}
        </option>
      ))}
    </select>
  )
}
