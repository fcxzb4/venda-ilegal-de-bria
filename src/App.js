import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MemePage from './module/pages/MemePage';
import HomePage from './module/pages/HomePage'; // Ajuste o caminho se necessário
import Header from './components/container/Header'; // Ajuste o caminho se necessário

// Você precisará importar as páginas dos outros módulos (ProductRoutes e AuthRoutes)
// Se você não as tem, precisará criá-las ou usar nomes de placeholder.
// Vou usar placeholders para 'ProductListPage', 'ProductDetailPage', 'LoginPage', 'RegisterPage'

// Componentes de Placeholder (Ajuste ou substitua pelos seus componentes reais)
// const ProductListPage = () => <h1>Lista de Produtos</h1>;
// const ProductDetailPage = () => <h1>Detalhe do Produto</h1>;
// const LoginPage = () => <h1>Login</h1>;
// const RegisterPage = () => <h1>Registro</h1>;


function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* O <Routes> principal que contém todas as rotas */}
      <Routes>
        {/* Rotas "gerais" ou "core" da aplicação */} 
        <Route path="/" element={<HomePage />} />
        <Route path='/Memes' element={<MemePage />} />

        {/* Exemplo de Rotas do Módulo de Produtos (originalmente em ProductRoutes.js) */}
        {/* <Route path="/produtos" element={<ProductListPage />} />
        <Route path="/produtos/:id" element={<ProductDetailPage />} /> */}

        {/* Exemplo de Rotas do Módulo de Autenticação (originalmente em AuthRoutes.js) */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;