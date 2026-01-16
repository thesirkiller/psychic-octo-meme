import React from 'react'
import { Link } from 'react-router-dom'

const LandingNavbar = () => {
    return (
        <nav className="landing-navbar-container">
            <div className="landing-navbar">
                <div className="landing-logo">
                    <img src="/favicon.png" alt="Zenith Logo" className="logo-img-nav" />
                    <span className="logo-text">Zenith</span>
                </div>

                <div className="landing-nav-links">
                    <a href="#features" className="nav-link">Recursos</a>
                    <a href="#security" className="nav-link">Segurança</a>
                    <Link to="/login" className="nav-link">Entrar</Link>
                    <Link to="/register" className="btn-navbar">Criar Conta</Link>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar
