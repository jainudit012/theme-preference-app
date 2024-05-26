import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try{
                const decodedToken = jwtDecode(token)
                const expirationTime = decodedToken.exp * 1000
                const currentTime = new Date().getTime()
                if ( currentTime < expirationTime ){
                    setUser({ token, ...decodedToken })
                } else {
                    toast.info('Session Expired! Logging Out.', { toastId: 'session-expired' })
                    logout()
                }
            }catch(err){
                toast.error('Invalid Session! Logging Out.', { toastId: 'session-invalid' })
                logout()
            }
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
