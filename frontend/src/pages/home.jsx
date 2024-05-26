import React, { useContext } from 'react'
import AppNavBar from '../components/navbar'
import { ThemeContext } from '../context/themeContext'

const Home = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className="home-container">
            <AppNavBar />
            <section className={`section ${theme}`}>
                <h1>Welcome to Theme Selector</h1>
                <p>Current selected theme of the application is : <span>{theme}</span></p>
            </section>
        </div>
    )
}

export default Home
