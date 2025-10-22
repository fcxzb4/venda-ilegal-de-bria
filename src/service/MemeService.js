// URL base da sua API NestJS.
const API_URL = 'http://localhost:3001/meme';

/**
 * Lida com a lógica de fazer requisições para a API de memes.
 * Cada função corresponde a uma operação do backend.
 */
const MemeApiService = {
  /**
   * Busca todos os memes.
   * @returns {Promise<Array>} Uma promessa que resolve para a lista de memes.
   */
  getAllMemes: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Falha ao buscar os memes.');
    }
    return response.json();
  },

  /**
   * Cria um novo meme.
   * @param {object} memeData - Os dados do novo meme (título, descrição, etc.).
   * @returns {Promise<object>} Uma promessa que resolve para o novo meme criado.
   */
  createMeme: async (memeData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memeData),
    });
    if (!response.ok) {
      throw new Error('Falha ao criar o meme.');
    }
    return response.json();
  },

  /**
   * Atualiza um meme existente.
   * @param {number} id - O ID do meme a ser atualizado.
   * @param {object} memeData - Os novos dados para o meme.
   * @returns {Promise<object>} Uma promessa que resolve para o meme atualizado.
   */
  updateMeme: async (id, memeData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memeData),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar o meme.');
    }
    return response.json();
  },

  /**
   * Deleta um meme.
   * @param {number} id - O ID do meme a ser deletado.
   * @returns {Promise<object>} Uma promessa que resolve para o meme que foi deletado.
   */
  deleteMeme: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Falha ao deletar o meme.');
    }
    return response.json();
  },
};

export default MemeApiService;
