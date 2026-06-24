import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ArticleEditor from './pages/ArticleEditor';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/articles/new" element={<ArticleEditor />} />
        <Route path="/articles/:id/edit" element={<ArticleEditor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
