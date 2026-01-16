export default function Card({ children, title, className = '' }) {
    return (
        <div className={`glass p-8 rounded-2xl shadow-2xl border-t border-white/10 ${className}`}>
            {title && <h3 className="text-xl font-bold mb-6 text-[#ededed] tracking-tight">{title}</h3>}
            {children}
        </div>
    )
}
