import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import App from './App';
import TelaInicial from './pages/Cardapio/Cardapio';
import Home from './pages/Login'

import './index.css'

//import Menu from './pages/Cardapio/Cardapio'

// Garante que o elemento existe antes de passar pro createRoot
const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Elemento root não encontrado')

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/card" element={<TelaInicial/>}/>
        {/* <Route path="/Cardapio" element={<Menu />}/> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
