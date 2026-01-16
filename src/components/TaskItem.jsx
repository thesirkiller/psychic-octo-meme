import React from 'react'

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div
            className={`group glass p-5 rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-white/[0.05] hover:scale-[1.01] hover:shadow-2xl hover:border-white/20 ${task.is_completed ? 'opacity-75' : ''
                }`}
        >
            <div className="flex items-center gap-4 flex-1">
                <div className="relative flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={task.is_completed}
                        onChange={() => onToggle(task.id, task.is_completed)}
                        className="peer appearance-none h-6 w-6 rounded-full border-2 border-white/10 bg-white/5 checked:bg-[#3ecf8e] checked:border-[#3ecf8e] cursor-pointer transition-all duration-300 hover:border-[#3ecf8e]/50"
                    />
                    <svg
                        className="absolute h-4 w-4 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <span className={`text-lg font-medium transition-all duration-500 truncate ${task.is_completed
                        ? 'line-through text-gray-500 decoration-gray-500/50'
                        : 'text-[#ededed]'
                    }`}>
                    {task.title}
                </span>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                title="Excluir tarefa"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}
