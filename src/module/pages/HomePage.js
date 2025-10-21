// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import CardForm from '../../components/CardForm';
import ApiService from '../../service/Service'; // Supondo um serviço de API

function HomePage() {
 const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null); // null para criar, objeto do cartão para editar

  // Função para carregar os cartões da API
  const fetchCards = async () => {
    setIsLoading(true);
    const data = await ApiService.getCards();
    setCards(data);
    setIsLoading(false);
  };

  // Carrega os dados iniciais na montagem do componente
  useEffect(() => {
    fetchCards();
  }, []);

  // Manipulador para abrir o formulário em modo de adição
  const handleAddNew = () => {
    setEditingCard(null);
    setIsFormVisible(true);
  };

  // Manipulador para abrir o formulário em modo de edição
  const handleEdit = (card) => {
    setEditingCard(card);
    setIsFormVisible(true);
  };

  // Manipulador para deletar um cartão
  const handleDelete = async (id) => {
    // Confirmação do usuário (uma alternativa ao `window.confirm`)
    if (("Tem certeza que deseja deletar este cartão?")) {
      const success = await ApiService.deleteCard(id);
      if (success) {
        // Remove o cartão da lista local para atualização instantânea da UI
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      }
    }
  };

  // Manipulador para salvar (criar ou atualizar) um cartão
  const handleSave = async (cardData) => {
    if (editingCard) {
      // Atualizar
      const updatedCard = await ApiService.updateCard(editingCard.id, cardData);
      if (updatedCard) {
        setCards((prevCards) =>
          prevCards.map((c) => (c.id === editingCard.id ? updatedCard : c))
        );
      }
    } else {
      // Criar
      const newCard = await ApiService.createCard(cardData);
      if (newCard) {
        setCards((prevCards) => [...prevCards, newCard]);
      }
    }
    // Fecha o formulário após salvar
    setIsFormVisible(false);
    setEditingCard(null);
  };

  // Manipulador para fechar o formulário
  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingCard(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <div className="container mx-auto p-6 lg:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Gerenciador de Conteúdo
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Crie, edite e organize seus cartões de forma simples e moderna.
          </p>
        </header>

        <main>
          {isLoading ? (
            <p className="text-center text-slate-400">Carregando cartões...</p>
          ) : (
            <MainScreen
              cards={cards}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={handleAddNew}
            />
          )}
        </main>
      </div>

      {/* Renderiza o formulário modal se estiver visível */}
      {isFormVisible && (
        <CardForm
          card={editingCard}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
export default HomePage;