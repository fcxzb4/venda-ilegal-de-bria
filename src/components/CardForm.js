import { useState, useEffect } from "react";

// --- COMPONENTE DO FORMULÁRIO (CardForm) ---
// Um formulário modal para criar ou editar um cartão.
function CardForm({ card, onSave, onCancel }) {
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  // Efeito para preencher o formulário quando um cartão é passado para edição
  useEffect(() => {
    if (card) {
      setFormData(card);
    } else {
      // Limpa o formulário se for para criar um novo
      setFormData({ title: '', description: '', image: '' });
    }
  }, [card]);

  // Manipulador para mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipulador para o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adiciona uma imagem padrão se o campo estiver vazio
    const dataToSave = {
      ...formData,
      image: formData.image || `https://placehold.co/600x400/334155/ffffff?text=${encodeURIComponent(formData.title)}`
    };
    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all scale-100">
        <h2 className="text-2xl font-bold text-white mb-6">{card ? 'Editar Cartão' : 'Criar Novo Cartão'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              required
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição"
              required
              rows="4"
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="URL da Imagem (opcional)"
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-500 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;