import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import axiosInstance from '../axios/axiosInstance'

export const ThemeContext = createContext(process.env.DEFAULT_THEME||'light')

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(process.env.DEFAULT_THEME||'light')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token)
            setTheme(decodedToken.theme)
        }
    }, [])

    const saveTheme = (newTheme, updateTheme=false) => {
        setTheme(newTheme)
        // console.log("updateTheme", updateTheme)
        const token = localStorage.getItem('token')
        if(updateTheme && token){
            axiosInstance.put('/user/preferences', { theme: newTheme })
                .catch(error => {
                    console.error('Error saving user preferences:', error)
                })
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
