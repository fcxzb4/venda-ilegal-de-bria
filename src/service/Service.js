// --- SERVICE (ApiService) ---
// Responsável pela comunicação com a API backend.
const ApiService = {
  // O URL base da nossa API
  BASE_URL: 'http://localhost:3001/card',

  // Busca todos os cartões do servidor
  getCards: async () => {
    try {
      const response = await fetch(ApiService.BASE_URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar os dados da API.');
      }
      return await response.json();
    } catch (error) {
      console.error("Erro em getCards:", error);
      // Retorna um array vazio em caso de erro para não quebrar a UI
      return [];
    }
  },

  // Cria um novo cartão
  createCard: async (cardData) => {
    try {
      const response = await fetch(ApiService.BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });
      if (!response.ok) {
        throw new Error('Falha ao criar o cartão.');
      }
      return await response.json();
    } catch (error) {
      console.error("Erro em createCard:", error);
      return null;
    }
  },

  // Atualiza um cartão existente
  updateCard: async (id, cardData) => {
    try {
      const response = await fetch(`${ApiService.BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar o cartão.');
      }
      return await response.json();
    } catch (error) {
      console.error("Erro em updateCard:", error);
      return null;
    }
  },

  // Deleta um cartão
  deleteCard: async (id) => {
    try {
      const response = await fetch(`${ApiService.BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao deletar o cartão.');
      }
      // A resposta de um DELETE bem-sucedido geralmente não tem corpo
      return true;
    } catch (error) {
      console.error("Erro em deleteCard:", error);
      return false;
    }
  },
};

export default ApiService