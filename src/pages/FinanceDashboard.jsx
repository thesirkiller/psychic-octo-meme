import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { useAuth } from '../hooks/useAuth'
import { useTransactions } from '../hooks/useTransactions'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'

export default function FinanceDashboard() {
    const { user } = useAuth()
    const { transactions, loading } = useTransactions(user?.id)

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0)
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0)
        const balance = income - expenses
        return { income, expenses, balance }
    }, [transactions])

    const chartData = useMemo(() => {
        // Group by month
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date()
            d.setMonth(d.getMonth() - (5 - i))
            return d.toLocaleString('pt-BR', { month: 'short' })
        })

        const monthsMap = {}
        last6Months.forEach(m => monthsMap[m] = { name: m, income: 0, expense: 0 })

        transactions.forEach(t => {
            const m = new Date(t.date).toLocaleString('pt-BR', { month: 'short' })
            if (monthsMap[m]) {
                monthsMap[m][t.type] += parseFloat(t.amount)
            }
        })

        return Object.values(monthsMap)
    }, [transactions])

    const pieData = useMemo(() => {
        const categories = {}
        transactions.filter(t => t.type === 'expense').forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount)
        })
        return Object.entries(categories).map(([name, value]) => ({ name, value }))
    }, [transactions])

    const PIE_COLORS = ['#3ecf8e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3ecf8e]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
            <Navbar />

            <div className="max-w-[1400px] mx-auto">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-[#ededed] mb-2 tracking-tight">
                            Dashboard <span className="text-[#3ecf8e] font-black">Financeiro</span>
                        </h1>
                        <p className="text-gray-400">Visão geral da sua saúde financeira.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Saldo Total"
                        value={`R$ ${stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color={stats.balance >= 0 ? "primary" : "danger"}
                        icon={<span className="text-xl">💳</span>}
                    />
                    <StatCard
                        title="Receitas"
                        value={`R$ ${stats.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color="blue"
                        icon={<span className="text-xl">📈</span>}
                    />
                    <StatCard
                        title="Despesas"
                        value={`R$ ${stats.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        color="amber"
                        icon={<span className="text-xl">📉</span>}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <Card title="Fluxo de Caixa (6 Meses)">
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3ecf8e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3ecf8e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#666' }}
                                    />
                                    <YAxis
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `R$ ${value}`}
                                        tick={{ fill: '#666' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="income" stroke="#3ecf8e" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="expense" stroke="#f59e0b" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title="Gastos por Categoria">
                        <div className="h-[300px] w-full mt-4 flex items-center justify-center">
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-500 italic">Sem dados de despesas para exibir.</p>
                            )}
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {pieData.map((d, i) => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></div>
                                    <span className="text-xs text-gray-400 font-medium">{d.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
