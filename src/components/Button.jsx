export default function Button({ children, type = 'button', variant = 'primary', loading, className = '', ...props }) {
    const variants = {
        primary: 'bg-[#3ecf8e] text-[#000000] hover:bg-[#4ade80] hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-[0.97] shadow-xl shadow-emerald-500/20 border-t border-white/20 glass-border-top transition-all duration-400',
        secondary: 'glass-heavy glass-shimmer glass-reflection text-[#ededed] hover:backdrop-blur-[30px] hover:brightness-110 active:scale-[0.97] shadow-xl transition-all duration-400',
        danger: 'glass-medium text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 active:scale-[0.97] transition-all duration-400',
    }

    return (
        <button
            type={type}
            disabled={loading || props.disabled}
            className={`px-4 py-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
            )}
            {children}
        </button>
    )
}
