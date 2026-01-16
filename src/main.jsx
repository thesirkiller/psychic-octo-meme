import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// Re-triggering build to ensure environment variables are applied correctly

// Help debug production issues
window.onerror = function (msg, url, lineNo, columnNo, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; color: white; background: #900; font-family: sans-serif; border-radius: 8px; margin: 20px;">
        <h1 style="font-size: 1.2rem;">Ocorreu um erro ao carregar o App:</h1>
        <pre style="white-space: pre-wrap; font-size: 0.8rem;">${msg}</pre>
        <p style="font-size: 0.8rem;">Verifique se as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão corretas no Cloudflare.</p>
      </div>
    `;
  }
  return false;
};

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e) {
  console.error("Erro na renderização inicial:", e);
}
