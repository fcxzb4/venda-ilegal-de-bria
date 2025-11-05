import { useState, useEffect } from "react";
import ApiService from "../service/Service"; // O hook importa o serviço

// Este é o seu novo hook customizado
export function useCardLogic() {
  // 1. Toda a lógica de estado que estava na HomePage
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null); // Bônus: adicionei um estado de erro

  // 2. A lógica de busca de dados
  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ApiService.getCards();
      setCards(data);
    } catch (err) {
      console.error("Erro ao buscar cards:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // O useEffect que estava na HomePage
  useEffect(() => {
    fetchCards();
  }, []); // Roda apenas uma vez na montagem

  // 3. Todas as funções de manipulação (handlers)
  const handleAddNew = () => {
    setEditingCard({
      title: "",
      description: "",
      price: "",
      stock: true,
      image: "",
    });
    setIsFormVisible(true);
    setIsEditing(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsFormVisible(true);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    // Corrigi um pequeno bug: if("string") é sempre true.
    // O correto é usar window.confirm()
    if (window.confirm("Tem certeza que deseja deletar este cartão?")) {
      try {
        const success = await ApiService.deleteCard(id);
        if (success) {
          setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        }
      } catch (err) {
        console.error("Erro ao deletar o card:", err);
        setError(err);
      }
    }
  };

  const handleSave = async (cardData) => {
    try {
      if (isEditing) {
        const updatedCard = await ApiService.updateCard(
          editingCard.id,
          cardData
        );
        if (updatedCard) {
          setCards((prevCards) =>
            prevCards.map((c) => (c.id === editingCard.id ? updatedCard : c))
          );
        }
      } else {
        const newCard = await ApiService.createCard(cardData);
        if (newCard) {
          setCards((prevCards) => [...prevCards, newCard]);
        }
      }

      setIsFormVisible(false);
      setEditingCard(null);
    } catch (err) {
      console.error("Erro ao salvar o card:", err);
      setError(err);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingCard(null);
  };

  // 4. O hook retorna tudo que a página precisa para funcionar
  return {
    cards,
    isLoading,
    isFormVisible,
    editingCard,
    error,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  };
}
