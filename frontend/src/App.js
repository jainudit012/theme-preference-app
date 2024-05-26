import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify' 
import { ThemeProvider } from './context/themeContext'
import { AuthProvider } from './context/authContext'
import Layout from './layout/layout'
import Home from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'

const App = () => {

  return (
    <Router>
        <ThemeProvider>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage/>} />
            </Routes>
        </AuthProvider>
        </ThemeProvider>
        <ToastContainer />
    </Router>
  )
}

export default App
