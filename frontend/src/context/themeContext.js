import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../axios/axiosInstance'

export const ThemeContext = createContext(process.env.REACT_APP_DEFAULT_THEME||'light')

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(process.env.REACT_APP_DEFAULT_THEME||'light')

    useEffect(() => {
        const existingThemeValue = localStorage.getItem('theme')
        if (existingThemeValue) {
            setTheme(existingThemeValue)
        }
    }, [])

    const saveTheme = (newTheme, updateTheme=false) => {
        const previousThemeValue = localStorage.getItem('theme')
        if(previousThemeValue !== newTheme){
            setTheme(newTheme)
            localStorage.setItem('theme', newTheme)
            // console.log("updateTheme", updateTheme)
            const token = localStorage.getItem('token')
            if(updateTheme && token){
                axiosInstance.put('/user/preferences', { theme: newTheme })
                    .catch(error => {
                        console.error('Error saving user preferences:', error)
                    })
            }
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
