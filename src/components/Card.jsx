export default function Card({ children, title, className = '' }) {
    return (
        <div className={`glass-light glass-border-top glass-inner-glow p-8 rounded-2xl shadow-2xl hover:backdrop-blur-[35px] hover:brightness-105 transition-all duration-400 ${className}`}>
            {title && <h3 className="text-xl font-bold mb-6 text-[#ededed] tracking-tight">{title}</h3>}
            {children}
        </div>
    )
}
