import { useState, useEffect } from 'react';

/**
 * Hook customizado para gerenciar toda a lógica de estado
 * do formulário de criação/edição de cartões.
 */
export function useCardFormLogic({ card, onSave }) {
  
  // O estado inicial agora inclui os campos de preço e estoque
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    stock: true, // Valor padrão para novos produtos
    image: ''
  });

  // Efeito que preenche o formulário se estivermos editando um 'card'
  useEffect(() => {
    if (card) {
      setFormData({
        id: '',
        title: card.title || '',
        description: card.description || '',
        price: card.price,
        stock: card.stock !== undefined ? card.stock : true,
        image: card.image || ''
      });
    } else {
      // Limpa o formulário se for para criar um novo
      setFormData({
        id: '',
        title: '',
        description: '',
        price: '',
        stock: true,
        image: ''
      });
    }
  }, [card]); // Re-executa se o 'card' mudar

  // Manipulador genérico para todos os inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Checa se o input é um checkbox para tratar o 'checked'
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manipulador para o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adiciona uma imagem padrão se o campo estiver vazio
    const dataToSave = {
      ...formData,
      image: formData.image || `https://placehold.co/600x400/e2e8f0/333?text=${encodeURIComponent(formData.title)}`
    };
    onSave(dataToSave);
  };

  // Retorna o estado e os manipuladores que o componente (UI) precisa
  return {
    formData,
    handleChange,
    handleSubmit
  };
}
