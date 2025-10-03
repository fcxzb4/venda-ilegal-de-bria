import React from "react";
import { useState } from "react";
import "./../../styles.css"; // Importa o CSS para o componente

function ProductCard({ product, onUpdate }) {
  // onUpdate é o trigger para o App.jsx

  // ... (Estados e Handlers de Edição existentes: isEditing, formData, handleChange, handleSave)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
  });

  // Handlers existentes...
  const handleChange = (e) => {
    // 🚨 Esta linha é CRÍTICA. Garante que o nome do campo (e.target.name)
    // é usado como chave para atualizar o valor (e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddToCart = async () => {
    /* ... */
  };

  const handleSave = async () => {
    try {
      // 1. O URL deve incluir o ID do produto:
      const response = await fetch(
        `http://localhost:3001/api/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // 2. O CORPO deve ser o objeto formData (com title, description, price, image, etc.)
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Cartão atualizado com sucesso!");
        setIsEditing(false);

        // 3. Força a recarga da lista no componente pai (App.jsx)
        if (onUpdate) {
          onUpdate();
        }
      } else {
        // Tenta obter a mensagem de erro da API
        const errorData = await response.json();
        alert(
          `Erro ao salvar edição: ${
            errorData.message || "Verifique o console."
          }`
        );
      }
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert(
        "Erro de rede. Verifique se o back-end está rodando e a porta está correta."
      );
    }
  };

  // 🚨 NOVA FUNÇÃO: Envia a requisição DELETE
  const handleDelete = async () => {
    // 1. Confirmação
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o produto "${product.title}"?`
      )
    ) {
      return;
    }

    try {
      // 2. Requisição DELETE
      // ⚠️ GARANTA QUE O ID ESTÁ SENDO INSERIDO CORRETAMENTE NA URL
      const response = await fetch(
        `http://localhost:3001/api/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      // DELETE deve retornar 204
      if (response.status === 204) {
        alert("Cartão excluído com sucesso!");

        // 3. Notifica o componente pai para recarregar a lista
        if (onUpdate) {
          onUpdate();
        }
      } else if (response.status === 404) {
        // Se o back-end retornou 404 (o produto não existe mais)
        alert("Erro 404: Produto já excluído ou ID inválido.");
      } else {
        alert("Erro ao excluir o cartão. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert("Erro de rede. Verifique se o back-end está rodando.");
    }
  };

  return (
    <div className="product-card">
      {/* ... (Estrutura do Cartão e lógica de Edição/Visualização - permanece a mesma) ... */}
      {/* Imagem e Campo de URL */}
      <img
        src={isEditing ? formData.image : product.image}
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
                        {/* 1. CAMPO DE URL DA IMAGEM (CONDICIONAL) */}       {" "}
        {isEditing && (
          <div style={{ marginBottom: "10px" }}>
                           {" "}
            <label style={{ fontSize: "0.8em", color: "#555" }}>
              URL da Imagem:
            </label>
                           {" "}
            <input
              type="text"
              name="image" // 🚨 ESSENCIAL 1: Nome idêntico à chave do estado (formData.image)
              value={formData.image} // 🚨 ESSENCIAL 2: Ligado ao valor do estado
              onChange={handleChange} // 🚨 ESSENCIAL 3: Chama a função que atualiza o estado
              placeholder="Cole o novo URL da imagem aqui"
              className="input-edit image-edit"
            />
                       {" "}
          </div>
        )}
                {/* 2. LÓGICA PARA TÍTULO */}       {" "}
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-edit title-edit"
          />
        ) : (
          <h3 className="product-title">{product.title}</h3>
        )}
                {/* 3. LÓGICA PARA DESCRIÇÃO */}       {" "}
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-edit description-edit"
          />
        ) : (
          <p className="product-description">{product.description}</p>
        )}
        {/* 4. LÓGICA PARA PREÇO */}
        <div className="price-section">
          {isEditing ? (
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-edit price-edit"
            />
          ) : (
            <span className="product-price">R$ {product.price}</span>
          )}
        </div>
                {/* 🚨 5. CORREÇÃO CRÍTICA: LÓGICA PARA OS BOTÕES */}
        {/* Este é o ÚNICO lugar onde o isEditing deve aparecer novamente */}   
           {" "}
        {isEditing ? (
          // MODO DE EDIÇÃO
          <>
                       {" "}
            <button className="edit-btn save-btn" onClick={handleSave}>
              Salvar Edição
            </button>
                       {" "}
            <button
              className="edit-btn cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
                     {" "}
          </>
        ) : (
          // MODO DE VISUALIZAÇÃO (TUDO deve estar aqui dentro)
          <>
                       {" "}
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Comprar
            </button>
                                   {" "}
            <button
              className="edit-btn"
              onClick={() => {
                setFormData({
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                });
                setIsEditing(true);
              }}
              style={{ marginTop: "5px" }}
            >
                              Editar            {" "}
            </button>
                                   {" "}
            <button
              className="edit-btn"
              onClick={handleDelete}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                marginTop: "5px",
              }}
            >
                              Excluir            {" "}
            </button>
                     {" "}
          </>
        )}
             {" "}
      </div>
         {" "}
    </div>
  );
}
export default ProductCard;
