import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="628025068852-cjernvki3n4jb7v52fdagb4m1jdrrv4d">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
)
