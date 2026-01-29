import { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import { useAuth } from '../hooks/useAuth'
import { useTransactions } from '../hooks/useTransactions'

const CATEGORIES = {
    expense: ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Moradia', 'Outros'],
    income: ['Salário', 'Investimentos', 'Freelance', 'Vendas', 'Outros']
}

export default function Transactions() {
    const { user } = useAuth()
    const { transactions, loading, addTransaction, deleteTransaction } = useTransactions(user?.id)

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState(CATEGORIES.expense[0])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddTransaction = async (e) => {
        e.preventDefault()
        if (!description || !amount) return

        setIsSubmitting(true)
        const result = await addTransaction({ description, amount, category, date, type })
        if (result.success) {
            setDescription('')
            setAmount('')
            setDate(new Date().toISOString().split('T')[0])
        }
        setIsSubmitting(false)
    }

    const handleTypeChange = (newType) => {
        setType(newType)
        setCategory(CATEGORIES[newType][0])
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-20 pb-12 px-8 transition-colors">
            <Navbar />

            <div className="max-w-[1400px] mx-auto">
                <header className="mb-12 text-center text-left md:text-center">
                    <h1 className="text-4xl font-bold text-[#ededed] mb-3 tracking-tight">
                        Gestão de <span className="text-[#3ecf8e] font-black">Lançamentos</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Adicione e gerencie suas receitas e despesas.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Form Column */}
                    <div className="lg:col-span-1">
                        <Card title="Novo Registro">
                            <form onSubmit={handleAddTransaction} className="space-y-4">
                                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('expense')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        DESPESA
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('income')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        RECEITA
                                    </button>
                                </div>

                                <Input
                                    label="Descrição"
                                    placeholder="Ex: Salário, Almoço..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Valor (R$)"
                                    type="number"
                                    step="0.01"
                                    placeholder="0,00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Data"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Categoria"
                                    type="select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    options={CATEGORIES[type]}
                                />
                                <Button
                                    type="submit"
                                    className={`w-full !pt-4 ${type === 'income' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-[#3ecf8e] hover:bg-[#4ade80]'}`}
                                    loading={isSubmitting}
                                >
                                    {type === 'income' ? 'Registrar Receita' : 'Registrar Despesa'}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* List Column */}
                    <div className="lg:col-span-3 space-y-4">
                        <h2 className="text-2xl font-bold text-[#ededed] mb-2 px-2">Histórico</h2>
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3ecf8e]"></div>
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="grid gap-3">
                                {transactions.map((t) => (
                                    <div key={t.id} className="glass p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all border-t border-white/10 border-l border-l-transparent hover:border-l-white/20">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold border ${t.type === 'income'
                                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                {t.type === 'income' ? '↑' : '↓'}
                                            </div>
                                            <div>
                                                <h4 className="text-[#ededed] font-bold">{t.description}</h4>
                                                <div className="flex gap-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                    <span>{t.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-lg font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                                                {t.type === 'income' ? '+' : '-'} R$ {parseFloat(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass text-center py-16 rounded-3xl border-dashed border-2 border-white/5">
                                <p className="text-gray-500 font-medium">Nenhum lançamento encontrado. Comece a organizar suas finanças! 💸</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
