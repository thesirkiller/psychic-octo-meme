export default function Button({ children, type = 'button', variant = 'primary', loading, className = '', ...props }) {
    const variants = {
        primary: 'bg-[#3ecf8e] text-[#000000] hover:bg-[#4ade80] active:scale-[0.96] shadow-xl shadow-emerald-500/20 border-t border-white/20',
        secondary: 'glass-dark text-[#ededed] hover:bg-white/10 active:scale-[0.96] shadow-xl border-t border-white/10',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white active:scale-[0.96]',
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
