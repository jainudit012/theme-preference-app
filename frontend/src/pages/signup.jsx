import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/signupForm'
import classes from '../styles/authPages.module.css'
import { AuthContext } from '../context/authContext'
import { ThemeContext } from '../context/themeContext'

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
        setUser({ user: data.user, token: data.token })
        saveTheme(data.user.theme)
        navigate('/')
    }

    return (
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
    )
}

export default SignupPage
