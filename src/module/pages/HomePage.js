import React, { useState, useEffect } from 'react';
import MainScreen from '../../components/container/mainscreen/MainScreen';
import CardForm from '../../components/container/cardform/CardForm';
import ApiService from '../../service/Service';

function HomePage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = async () => {
    setIsLoading(true);
    const data = await ApiService.getCards();
    setCards(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddNew = () => {
    setEditingCard(null);
    setIsFormVisible(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (("Tem certeza que deseja deletar este cartão?")) {
      const success = await ApiService.deleteCard(id);
      if (success) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      }
    }
  };

  const handleSave = async (cardData) => {
    if (editingCard) {
      const updatedCard = await ApiService.updateCard(editingCard.id, cardData);
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
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingCard(null);
  };

  return (
    <div className="min-h-screen bg-[#fff159] font-sans">
      {/* Header fixo estilo Mercado Livre */}
      <header className="bg-[#ffe600] shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Mercado<span className="text-blue-600">Manager</span>
        </h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors"
        >
          + Novo Produto
        </button>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Gerencie seus produtos
          </h2>
          <p className="text-gray-700 text-sm">
            Adicione, edite ou remova produtos de forma simples e rápida.
          </p>
        </div>

        <main>
          {isLoading ? (
            <p className="text-center text-gray-600">Carregando produtos...</p>
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

      {/* Modal de Formulário */}
      {isFormVisible && (
        <CardForm
          card={editingCard}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Rodapé */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4 border-t mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} MercadoManager — inspirado no Mercado Livre
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
