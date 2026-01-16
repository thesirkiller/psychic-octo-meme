import { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import TaskStats from '../components/TaskStats'
import TaskItem from '../components/TaskItem'

export default function Home() {
    const { user } = useAuth()
    const { tasks, loading: tasksLoading, addTask, toggleTask, deleteTask } = useTasks(user?.id)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.is_completed
        if (filter === 'completed') return task.is_completed
        return true
    })

    const handleAddTask = async (e) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return

        const result = await addTask(newTaskTitle)
        if (result.success) setNewTaskTitle('')
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8 transition-colors">
            <Navbar />

            <div className="max-w-[1400px] mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-[#ededed] mb-3 tracking-tight">
                        Olá, <span className="text-[#3ecf8e] font-black">{user?.email.split('@')[0]}</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Gerencie suas tarefas com a simplicidade do Supabase.
                    </p>
                </header>

                <TaskStats tasks={tasks} />

                <div className="space-y-6">
                    <Card title="Adicionar Nova Tarefa">
                        <form onSubmit={handleAddTask} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="O que precisa ser feito?"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                />
                            </div>
                            <Button type="submit">Adicionar</Button>
                        </form>
                    </Card>

                    <section>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 px-2">
                            <h2 className="text-2xl font-bold text-[#ededed] flex items-center gap-3">
                                Tarefas
                                <span className="text-xs font-bold text-[#3ecf8e] bg-[#3ecf8e]/10 border border-[#3ecf8e]/20 px-3 py-1 rounded-full">
                                    {tasks.length}
                                </span>
                            </h2>

                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl self-center">
                                {['all', 'active', 'completed'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${filter === f
                                            ? 'bg-[#3ecf8e] text-black shadow-lg shadow-emerald-500/20'
                                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {f === 'all' ? 'Todas' : f === 'active' ? 'Ativas' : 'Concluídas'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {tasksLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3ecf8e] mx-auto mb-4"></div>
                                <p className="text-gray-500">Carregando tarefas...</p>
                            </div>
                        ) : filteredTasks.length > 0 ? (
                            <div className="grid gap-3">
                                {filteredTasks.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={toggleTask}
                                        onDelete={deleteTask}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="glass text-center py-16 rounded-3xl border-dashed border-2 border-white/5">
                                <p className="text-gray-500 font-medium">
                                    {filter === 'all'
                                        ? 'Nenhuma tarefa encontrada. Comece adicionando uma acima! ✨'
                                        : filter === 'active'
                                            ? 'Nenhuma tarefa ativa no momento. 🎉'
                                            : 'Nenhuma tarefa concluída ainda. 🚀'}
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
