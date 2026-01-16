import React from 'react'

export default function StatCard({ title, value, icon, color = 'primary', className = '' }) {
    const colorClasses = {
        primary: 'text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/20',
        green: 'text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/20',
        amber: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
        blue: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20',
    }

    return (
        <div className={`glass p-6 rounded-3xl flex items-center gap-4 transition-all hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-2xl border-t border-white/10 ${className}`}>
            <div className={`p-3 rounded-2xl backdrop-blur-md border border-white/10 ${colorClasses[color] || colorClasses.primary}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-[#ededed]">{value}</h3>
            </div>
        </div>
    )
}
