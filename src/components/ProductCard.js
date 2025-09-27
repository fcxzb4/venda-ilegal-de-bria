import React from 'react';
import './../styles.css'; // Importa o CSS para o componente

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="price-section">
          <span className="product-price">R$ {product.price}</span>
        </div>
        <button className="add-to-cart-btn">Comprar</button>
      </div>
    </div>
  );
}

export default ProductCard;