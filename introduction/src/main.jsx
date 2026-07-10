import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar  from './components/Navbar.jsx';
import { BrowserRouter , Routes , Route } from "react-router";

createRoot(document.getElementById('root')).render(

<BrowserRouter>
<Navbar />
<Routes>
  <Route index element={<Home/>}  />
  <Route path="login" element={<Login/>}  />
  <Route path="register" element={<Register/>}  />
</Routes>
</BrowserRouter>

)
