import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaInicial from './pages/Cardapio/Cardapio';
import Login from './pages/Login/login'
import PedidosRecebidos from './pages/Pedidos/PedidosRecebidos';

import './index.css'
import CadastroProdutos from './pages/Categorias/CadastroProdutos';

//import Menu from './pages/Cardapio/Cardapio'

// Garante que o elemento existe antes de passar pro createRoot
const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Elemento root não encontrado')

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Login />} />
        <Route path="/card" element={<TelaInicial/>}/>
        <Route path="/pedidos" element={<PedidosRecebidos />} />
        <Route path="/cadastro" element={<CadastroProdutos />}/> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
