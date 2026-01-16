import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            if (error.message.includes('Email not confirmed')) {
                setError('Verifique sua caixa de entrada! Você precisa confirmar seu email antes de fazer login.')
            } else {
                setError('Credenciais inválidas ou erro no servidor.')
            }
            setLoading(false)
        } else {
            navigate('/')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] px-4">
            <div className="w-full max-w-md glass p-10 rounded-3xl shadow-2xl text-center">
                <div className="w-12 h-12 bg-[#3ecf8e] rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse-subtle shadow-sm"></div>
                </div>
                <h1 className="text-3xl font-bold text-[#ededed] mb-2 tracking-tight">Bem-vindo</h1>
                <p className="text-gray-400 mb-10 text-sm">Gerencie suas tarefas com ModernApp</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 text-red-400 rounded-md text-sm border border-red-900/30">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5 text-left">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Email</label>
                        <Input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Senha</label>
                        <Input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-6 py-3"
                    >
                        Entrar
                    </Button>
                </form>

                <p className="mt-8 text-sm text-gray-500">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-[#3ecf8e] font-semibold hover:text-[#4ade80] transition-colors">
                        Criar Conta
                    </Link>
                </p>
            </div>
        </div>
    )
}
