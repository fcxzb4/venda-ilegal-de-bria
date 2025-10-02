import React from 'react';
import { useState } from "react";
import './../../styles.css'; // Importa o CSS para o componente

function ProductCard({ product, onUpdate }) { // onUpdate é o trigger para o App.jsx
  
  // ... (Estados e Handlers de Edição existentes: isEditing, formData, handleChange, handleSave)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image
  });
  
  // Handlers existentes...
  const handleChange = (e) => { /* ... */ };
  const handleSave = async () => { /* ... */ };
  const handleAddToCart = async () => { /* ... */ };


  // 🚨 NOVA FUNÇÃO: Envia a requisição DELETE
  const handleDelete = async () => {
    // 1. Confirmação
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${product.title}"?`)) {
      return;
    }

    try {
      // 2. Requisição DELETE
      const response = await fetch(`http://localhost:3001/api/products/${product.id}`, {
        method: 'DELETE', 
      });

      // DELETE geralmente retorna 204 (No Content)
      if (response.status === 204) {
        alert("Cartão excluído com sucesso!");
        
        // 3. Notifica o componente pai (App.jsx) para recarregar a lista
        if (onUpdate) {
            onUpdate(); 
        }

      } else {
         // Lida com 404 ou outros erros (se o back-end retornar 404, por exemplo)
        alert('Erro ao excluir o cartão. Produto pode já ter sido removido.');
      }
    } catch (error) {
      console.error('Erro de conexão com a API:', error);
      alert('Erro de rede. Verifique se o back-end está rodando.');
    }
  };


  return (
    <div className="product-card">
      {/* ... (Estrutura do Cartão e lógica de Edição/Visualização - permanece a mesma) ... */}
      
      {/* Imagem e Campo de URL */}
      <img src={isEditing ? formData.image : product.image} alt={product.title} className="product-image" />
      
       <div className="product-info">
        
        {isEditing && (
            // CAMPO DE URL DA IMAGEM
            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.8em', color: '#555' }}>URL da Imagem:</label>
                <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="Cole o novo URL da imagem aqui"
                    className="input-edit image-edit"
                />
            </div>
        )}
        {/* ... (campos Title, Description, Price) ... */}


        {/* 🚨 BLOCO CORRIGIDO: Botões de Ação */}
        {isEditing ? (
          // MODO DE EDIÇÃO
          <>
            <button className="edit-btn save-btn" onClick={handleSave}>Salvar Edição</button>
            <button className="edit-btn cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          // MODO DE VISUALIZAÇÃO
          <>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Comprar</button>
            
            {/* 🚨 CORREÇÃO DO BOTÃO EDITAR */}
            <button 
                className="edit-btn" 
                onClick={() => { 
                    // 1. Inicializa o formulário com os dados atuais (para edição)
                    setFormData({
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        image: product.image
                    });
                    // 2. Entra no modo de edição
                    setIsEditing(true); 
                }} 
                style={{ marginTop: '5px' }}
            >
                Editar
            </button>
            
            {/* Botão de Deletar (funciona junto com a lógica de onUpdate) */}
            <button 
                className="edit-btn" 
                onClick={handleDelete} 
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', marginTop: '5px' }}
            >
                Excluir
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;