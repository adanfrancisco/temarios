import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/component/Login.jsx'
import Home from './pages/component/Home.jsx'
import Docentes from './pages/component/Docentes.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/docentes" element={<Docentes />} />
    </Routes>
  </BrowserRouter>,
)
