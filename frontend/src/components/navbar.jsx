import React, { useContext, useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { ThemeContext } from '../context/themeContext'
import { AuthContext } from '../context/authContext'
import axiosInstance from '../axios/axiosInstance'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const AppNavBar = () => {
    const { theme, saveTheme } = useContext(ThemeContext)
    const { user, logout } = useContext(AuthContext)
    const [themeOptions, setThemeOptions] = useState(['light', 'dark'])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await axiosInstance.get('/user/theme-choices')
                // console.log(response.data)
                setThemeOptions(response.data.choices.THEME_CHOICES)
            } catch (error) {
                console.error('Error fetching themes:', error)
                toast.error('Error in fecthing themes. Using default options', { toastId: 'theme-fetch-error' })
            }
        }
        fetchThemes()
    }, [])

    const handleSelect = (eventKey) => {
        saveTheme(eventKey, true)
    }

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout')
            logout()
            toast.success('Logged Out', { toastId: 'logout-success' })
            navigate('/login')
        } catch (error) {
            console.error('Error logging out:', error)
            toast.error(error.response?.data?.message??'Logout Failed', { toastId: 'logout-error' })
        }
    }

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <Navbar bg={theme} variant={theme} expand="lg">
            <Navbar.Brand as={Link} to="/">Theme App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Theme" id="basic-nav-dropdown" onSelect={handleSelect}>
                        {
                            themeOptions.map((theme, index) => (
                                <NavDropdown.Item eventKey={theme} key={index}>{theme}</NavDropdown.Item>
                            ))
                        }
                    </NavDropdown>
                    {user ?
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link> :
                        <Nav.Link onClick={goToLogin}>Login</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavBar
