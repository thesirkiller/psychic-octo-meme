import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] px-4">
            <div className="w-full max-w-md glass p-10 rounded-3xl shadow-2xl text-center">
                {!success && (
                    <>
                        <div className="w-12 h-12 bg-[#3ecf8e] rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse-subtle shadow-sm"></div>
                        </div>
                        <h1 className="text-3xl font-bold text-[#ededed] mb-2 tracking-tight">Criar Conta</h1>
                        <p className="text-gray-400 mb-10 text-sm">Junte-se a nós para organizar suas tarefas</p>
                    </>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 text-red-400 rounded-md text-sm border border-red-900/30">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="py-8">
                        <div className="w-16 h-16 bg-[#3ecf8e]/20 border border-[#3ecf8e]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-[#3ecf8e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#ededed] mb-2">Verifique seu email!</h2>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Enviamos um link de confirmação para <span className="text-[#3ecf8e] font-medium">{email}</span>.
                            Confirme seu cadastro para começar a usar o ModernApp.
                        </p>
                        <Link to="/login">
                            <Button variant="secondary" className="w-full">
                                Voltar para o Login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleRegister} className="space-y-5 text-left">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
                                <Input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Seu nome"
                                />
                            </div>
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
                                Criar Conta
                            </Button>
                        </form>

                        <p className="mt-8 text-sm text-gray-500">
                            Já tem uma conta?{' '}
                            <Link to="/login" className="text-[#3ecf8e] font-semibold hover:text-[#4ade80] transition-colors">
                                Entrar
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
