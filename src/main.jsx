import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router'
import AuthProvider from './AuthProvider/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 20px',
            background: '#f0f4ff',
            color: '#1e3a8a',
            boxShadow: '0 4px 12px rgba(59,130,246,0.15)',
          },
        }}
      />
    </StrictMode>
  </AuthProvider>
)
