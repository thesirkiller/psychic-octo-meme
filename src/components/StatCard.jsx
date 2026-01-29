import React from 'react'

export default function StatCard({ title, value, icon, color = 'primary', className = '' }) {
    const colorClasses = {
        primary: 'text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/20',
        green: 'text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/20',
        amber: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
        blue: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20',
    }

    return (
        <div className={`glass-light glass-border-top glass-inner-glow p-6 rounded-3xl flex items-center gap-4 transition-all duration-400 hover:backdrop-blur-[35px] hover:brightness-105 hover:scale-[1.02] hover:shadow-2xl ${className}`}>
            <div className={`p-3 rounded-2xl glass-medium backdrop-blur-md ${colorClasses[color] || colorClasses.primary}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-[#ededed]">{value}</h3>
            </div>
        </div>
    )
}
