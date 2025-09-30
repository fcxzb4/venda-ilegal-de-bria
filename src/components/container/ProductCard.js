import React from 'react';
import './../../styles.css'; // Importa o CSS para o componente

function ProductCard({ product }) {

  // Função para lidar com o clique no botão "Comprar"
  const handleAddToCart = async () => {
    try {
      // 🚨 O PONTO CHAVE: Fazer a requisição POST para a API
      const response = await fetch('http://localhost:3001/api/products/add-to-cart', {
        method: 'POST',
        headers: {
          // Informa que o corpo da requisição é um JSON
          'Content-Type': 'application/json', 
        },
        // Envia o ID do produto para o back-end
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (response.ok) {
        alert(`"${product.title}" adicionado ao carrinho!`);
        // Opcional: Aqui você pode adicionar lógica para atualizar um contador de carrinho
      } else {
        alert('Erro ao adicionar produto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro de conexão com a API:', error);
      alert('Erro de rede. Verifique se o back-end está rodando.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        {/* ... (resto do seu HTML/JSX do card) */}
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="price-section">
          <span className="product-price">R$ {product.price}</span>
        </div>
        
        {/* 🚨 Integração do Evento: Chamar a função POST no clique */}
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;