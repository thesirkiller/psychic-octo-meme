export default function Input({ label, error, type = 'text', className = '', options = [], ...props }) {
    const baseStyles = "w-full px-4 py-3 bg-white/5 text-[#ededed] border rounded-xl outline-none transition-all placeholder:text-gray-600 hover:border-white/20 focus:ring-1 focus:ring-[#3ecf8e]/30 focus:border-[#3ecf8e] backdrop-blur-md";
    const borderStyle = error ? 'border-red-500/50' : 'border-white/10';

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-tight">{label}</label>}

            {type === 'select' ? (
                <div className="relative">
                    <select
                        className={`${baseStyles} ${borderStyle} appearance-none cursor-pointer ${className}`}
                        {...props}
                    >
                        {options.map(option => (
                            <option key={option.value || option} value={option.value || option} className="bg-[#121212] text-white">
                                {option.label || option}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            ) : (
                <input
                    type={type}
                    className={`${baseStyles} ${borderStyle} ${type === 'date' ? 'cursor-text [color-scheme:dark]' : ''} ${className}`}
                    {...props}
                />
            )}
            {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    )
}
