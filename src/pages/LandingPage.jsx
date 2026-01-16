import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-container">
            <section className="hero-section">
                <div className="hero-tag">A Próxima Geração de Gestão Financeira</div>
                <h1 className="hero-title">
                    Suas finanças em um <br /> estado de clareza.
                </h1>
                <p className="hero-subtitle">
                    Uma experiência fluida e poderosa para gerenciar seu patrimônio,
                    acompanhar gastos e alcançar a liberdade financeira com tecnologia de ponta.
                </p>

                <div className="hero-cta">
                    <Link to="/register" className="btn-primary">Começar Agora</Link>
                    <Link to="/login" className="btn-secondary">Entrar na Conta</Link>
                </div>

                <div className="hero-visual">
                    {/* Using the generated premium hero image placeholder logic */}
                    <img
                        src="/assets/finance_landing_hero.png"
                        alt="Finance Dashboard Visualization"
                        style={{ filter: 'brightness(0.9)' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 60%, #171717 100%)'
                    }}></div>
                </div>
            </section>

            <section className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h3 className="feature-title">Segurança Bancária</h3>
                    <p className="feature-desc">Dados criptografados de ponta a ponta com a robustez e confiança do Supabase e Cloudflare.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    </div>
                    <h3 className="feature-title">Insights em Tempo Real</h3>
                    <p className="feature-desc">Visualize seu fluxo de caixa e distribuição de gastos instantaneamente com gráficos interativos.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                    </div>
                    <h3 className="feature-title">Gestão de Ativos</h3>
                    <p className="feature-desc">Mantenha o controle total sobre seus ganhos e despesas em uma interface fluida projetada para produtividade.</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
