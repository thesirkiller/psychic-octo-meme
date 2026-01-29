import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await signOut()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    const linkBaseClass = "text-xs font-bold transition-all duration-400 uppercase tracking-widest px-3 py-1.5 rounded-lg"
    const activeClass = "text-emerald-400 glass-heavy glass-shimmer shadow-[0_0_20px_rgba(62,207,142,0.15)]"
    const inactiveClass = "text-gray-400 hover:text-white hover:bg-white/5 hover:backdrop-blur-md"

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 glass-frosted glass-border-top border-b border-white/10 z-50 transition-all duration-400">
            <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-8">
                <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2 text-emerald-500">
                    <img src="/favicon.png" alt="Zenith Logo" className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(62,207,142,0.3)] rounded-md" />
                    Zenith
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className={`${linkBaseClass} ${isActive('/dashboard') ? activeClass : inactiveClass}`}
                    >
                        Início
                    </Link>
                    <Link
                        to="/transactions"
                        className={`${linkBaseClass} ${isActive('/transactions') ? activeClass : inactiveClass}`}
                    >
                        Lançamentos
                    </Link>
                    <Link
                        to="/finance-dashboard"
                        className={`${linkBaseClass} ${isActive('/finance-dashboard') ? activeClass : inactiveClass}`}
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#3ecf8e] hover:text-[#4ade80] transition-all duration-400 glass-medium hover:backdrop-blur-[30px] hover:brightness-110 uppercase tracking-wider relative overflow-hidden"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 text-xs font-bold text-[#000000] bg-[#3ecf8e] rounded-md hover:bg-[#34b27b] transition-all uppercase tracking-wider shadow-sm"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
