import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InstallPrompt from './components/InstallPrompt';
import Landing from './pages/Landing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/herramientas" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <InstallPrompt />
    </BrowserRouter>
  </StrictMode>,
);
