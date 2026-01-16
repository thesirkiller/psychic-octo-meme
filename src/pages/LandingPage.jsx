import LandingNavbar from '../components/LandingNavbar'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-container">
            <LandingNavbar />
            <section className="hero-section reveal">
                <div className="hero-tag fade-in">O Ápice da sua Inteligência Financeira</div>
                <h1 className="hero-title slide-up">
                    Alcance o Zenith do seu <br /> sucesso financeiro.
                </h1>
                <p className="hero-subtitle slide-up delay-1">
                    Uma plataforma de elite projetada para quem busca clareza absoluta,
                    controle total e crescimento contínuo do seu patrimônio.
                </p>

                <div className="hero-cta slide-up delay-2">
                    <Link to="/register" className="btn-primary">Começar Agora</Link>
                    <Link to="/login" className="btn-secondary">Entrar na Conta</Link>
                </div>

                <div className="hero-visual reveal delay-3">
                    <img
                        src="/assets/finance_landing_hero.png"
                        alt="Finance Dashboard Visualization"
                        className="hero-img"
                    />
                    <div className="hero-gradient-overlay"></div>
                </div>
            </section>

            <section id="features" className="features-grid">
                <div className="section-header">
                    <h2 className="section-title">Tecnologia Inteligente</h2>
                    <p className="section-subtitle">Tudo o que você precisa para dominar suas finanças em um só lugar.</p>
                </div>
                <div className="features-content">
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
                </div>
            </section>

            <section id="security" className="security-section reveal">
                <div className="security-content">
                    <div className="security-info">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <h2 className="section-title">Segurança de<br />Nível Bancário</h2>
                        <p className="section-subtitle">
                            Sua privacidade é nossa prioridade absoluta. Seus dados são protegidos por criptografia
                            de ponta a ponta e infraestrutura global segura.
                        </p>
                        <ul className="security-list">
                            <li>AES-256 Encryption</li>
                            <li>Autenticação de Dois Fatores</li>
                            <li>Infraestrutura Cloudflare & Supabase</li>
                        </ul>
                    </div>
                    <div className="security-visual">
                        <div className="glass-shield">
                            <div className="shield-glow"></div>
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
