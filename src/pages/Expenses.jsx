import { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { useAuth } from '../hooks/useAuth'
import { useExpenses } from '../hooks/useExpenses'

const CATEGORIES = [
    'Alimentação',
    'Transporte',
    'Lazer',
    'Saúde',
    'Moradia',
    'Outros'
]

export default function Expenses() {
    const { user } = useAuth()
    const { expenses, loading, addExpense, deleteExpense } = useExpenses(user?.id)

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState(CATEGORIES[0])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)
    const monthExpenses = expenses
        .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
        .reduce((sum, e) => sum + parseFloat(e.amount), 0)

    const handleAddExpense = async (e) => {
        e.preventDefault()
        if (!description || !amount) return

        setIsSubmitting(true)
        const result = await addExpense({ description, amount, category })
        if (result.success) {
            setDescription('')
            setAmount('')
            setCategory(CATEGORIES[0])
        }
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 transition-colors">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-[#ededed] mb-3 tracking-tight">
                        Gestão de <span className="text-[#3ecf8e] font-black">Gastos</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Controle suas finanças com elegância e clareza.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Total Geral"
                        value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color="primary"
                        icon={<span className="text-xl">💰</span>}
                    />
                    <StatCard
                        title="Este Mês"
                        value={`R$ ${monthExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color="blue"
                        icon={<span className="text-xl">📅</span>}
                    />
                    <StatCard
                        title="Média por Item"
                        value={`R$ ${(expenses.length > 0 ? totalExpenses / expenses.length : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color="amber"
                        icon={<span className="text-xl">📊</span>}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Column */}
                    <div className="lg:col-span-1">
                        <Card title="Novo Gasto" className="h-fit">
                            <form onSubmit={handleAddExpense} className="space-y-4">
                                <Input
                                    label="Descrição"
                                    placeholder="Ex: Aluguel, Almoço..."
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Categoria</label>
                                    <select
                                        className="w-full px-4 py-3 bg-white/5 text-[#ededed] border border-white/10 rounded-xl outline-none focus:border-[#3ecf8e] transition-all appearance-none cursor-pointer"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {CATEGORIES.map(c => (
                                            <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full pt-4"
                                    loading={isSubmitting}
                                >
                                    Registrar Gasto
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* List Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-[#ededed] mb-2 px-2">Histórico Recente</h2>
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3ecf8e]"></div>
                            </div>
                        ) : expenses.length > 0 ? (
                            <div className="grid gap-3">
                                {expenses.map((expense) => (
                                    <div key={expense.id} className="glass p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all border-t border-white/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-[#3ecf8e]/10 text-[#3ecf8e] rounded-xl font-bold border border-[#3ecf8e]/20">
                                                {expense.category[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-[#ededed] font-bold">{expense.description}</h4>
                                                <div className="flex gap-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                    <span>{expense.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(expense.date).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-bold text-[#3ecf8e]">
                                                R$ {parseFloat(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <button
                                                onClick={() => deleteExpense(expense.id)}
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
                                <p className="text-gray-500 font-medium">Nenhum gasto registrado ainda. Comece a economizar! 💸</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
