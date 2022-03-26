import { useEffect, useState } from 'react'
import { THEME } from '../constants'

export const themes = ['light', 'dim', 'dark'] as const

export type ITheme = typeof themes[number]

function getBrowserTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function useTheme(): [ITheme, (t: ITheme) => void] {
  const _theme = (localStorage.getItem(THEME) as ITheme) ?? getBrowserTheme()
  const [theme, setTheme] = useState(_theme)

  function set(newTheme: ITheme) {
    try {
      localStorage.setItem(THEME, newTheme)
      setTheme(newTheme)
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return [theme, set]
}
