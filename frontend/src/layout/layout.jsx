import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

const Layout = () => {
    const { theme, saveTheme } = useContext(ThemeContext)

    const handleThemeChange = (event) => {
        saveTheme(event.target.value)
    }

    return (
        <div className={`layout ${theme}`}>
            <header>
                <h1>Theme Selector</h1>
                <select value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
            </header>
            <main>
                <p>Your selected theme is {theme}</p>
            </main>
        </div>
    );
};

export default Layout
