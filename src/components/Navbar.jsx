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

    const linkBaseClass = "text-xs font-bold transition-all uppercase tracking-widest px-3 py-1 rounded-lg"
    const activeClass = "text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(62,207,142,0.1)]"
    const inactiveClass = "text-gray-400 hover:text-white"

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-xl border-b border-white/5 z-50">
            <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-8">
                <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2 text-emerald-500">
                    <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-subtle"></div>
                    </div>
                    ModernApp
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
                                className="px-3 py-1.5 text-xs font-semibold text-[#3ecf8e] hover:text-[#4ade80] transition-all border border-[#3ecf8e]/20 rounded-md bg-[#3ecf8e]/5 hover:bg-[#3ecf8e]/10 uppercase tracking-wider"
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
