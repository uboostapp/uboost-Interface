import { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { ThemeState } from 'utils/types'

export const ThemeContext = createContext<ThemeState>({
  theme: 'dark',
  handleToggleTheme: () => {},
})

export default function ThemeProvider(props) {
  const [theme, toggleTheme] = useState<string>(() => {
    let _cache = Cookies.get('theme')
    return _cache ?? 'dark'
  })

  function handleChange(state: string) {
    toggleTheme(state)
    Cookies.set('theme', state)
  }

  let data: ThemeState = {
    theme,
    handleToggleTheme: () => handleChange(theme === 'light' ? 'dark' : 'light'),
  }

  return <ThemeContext.Provider value={data}>{props.children}</ThemeContext.Provider>
}
