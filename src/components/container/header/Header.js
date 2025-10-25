import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Componente Header
 * Contém o logotipo e a navegação principal do site.
 * Usa NavLink para aplicar um estilo ao link da página ativa.
 */
function Header() {
  // Estilo base para os links de navegação.
  const linkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors";
  
  // Estilo que será aplicado SOMENTE no link da página que está ativa no momento.
  // O NavLink gerencia isso automaticamente para nós.
  const activeLinkStyle = {
    backgroundColor: '#4f46e5', // Um tom de roxo/índigo
    color: 'white',
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Lado Esquerdo: Logotipo ou Nome do Site */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Meu E-commerce
            </Link>
          </div>

          {/* Lado Direito: Links de Navegação */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              
              {/* Usamos NavLink em vez de Link para poder estilizar o link ativo */}
              <NavLink
                to="/"
                className={linkStyle}
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                Página Inicial
              </NavLink>

              <NavLink
                to="/Memes"
                className={linkStyle}
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                pagina Meme
              </NavLink>

              {/* Adicione outros links aqui conforme sua aplicação cresce */}
              {/* Exemplo:
              <NavLink to="/produtos" className={linkStyle} style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                Produtos
              </NavLink> 
              */}
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;