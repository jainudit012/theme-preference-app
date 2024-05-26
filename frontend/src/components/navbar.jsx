import React, { useContext, useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { ThemeContext } from '../context/themeContext'
import { AuthContext } from '../context/authContext'
import axiosInstance from '../axios/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

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
                toast.error('Error in fecthing themes. Using default options')
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
            toast.success('Logged Out')
            navigate('/login')
        } catch (error) {
            console.error('Error logging out:', error)
            toast.error(error.response?.data?.message??'Logout Failed')
        }
    }

    return (
        <Navbar bg={theme} variant={theme} expand="lg">
            <Navbar.Brand href="#home">Theme App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Theme Preferences" id="basic-nav-dropdown" onSelect={handleSelect}>
                        {
                            themeOptions.map((theme, index) => (
                                <NavDropdown.Item eventKey={theme} key={index}>{theme}</NavDropdown.Item>
                            ))
                        }
                    </NavDropdown>
                </Nav>
                { user &&
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavBar
