import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import SignupForm from '../components/signupForm'
import classes from '../styles/authPages.module.css'
import { AuthContext } from '../context/authContext'
import { ThemeContext } from '../context/themeContext'
import AppNavBar from '../components/navbar'

const SignupPage = () => {
    const { user, setUser } = useContext(AuthContext)
    const { theme, saveTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [])

    const handleSignupSuccess = data => {
        // console.log(data)
        localStorage.setItem('token', data.token)
        const decodedToken = jwtDecode(data.token)
        setUser({ token: data.token, ...decodedToken })
        saveTheme(data.user.theme)
        navigate('/')
    }

    return (
        <>
        <AppNavBar />
        <div className={classes.container}>
            <Container>
                <Row>
                    <h2 className={classes.page_heading}>Sign Up</h2>
                </Row>
                <Row>
                    <SignupForm onSuccess={handleSignupSuccess} theme={theme}/>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default SignupPage
