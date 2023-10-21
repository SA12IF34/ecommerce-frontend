import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ContextProvider from './context/ContextProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
