import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import LoginForm from '../components/loginForm'
import { useNavigate } from 'react-router-dom'
import classes from '../styles/authPages.module.css'
import { AuthContext } from '../context/authContext'
import { ThemeContext } from '../context/themeContext'

const LoginPage = () => {
    const { user, setUser } = useContext(AuthContext)
    const { saveTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(user || localStorage.getItem('token')){
            navigate('/')
        }
    }, [])

    const handleLoginSuccess = data => {
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
                    <h2 className={classes.page_heading}>Login</h2>
                </Row>
                <Row>
                    <LoginForm onSuccess={handleLoginSuccess}/>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage
