import { useState, useEffect } from 'react';
import MemeApiService from '../../service/MemeService';

// URL base da sua API NestJS. Altere se for diferente.
function MemePage() {
  // --- ESTADOS DO COMPONENTE ---
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMeme, setEditingMeme] = useState(null);

  // --- EFEITOS (LIFECYCLE) ---
  useEffect(() => {
    // A função de busca agora está mais limpa
    fetchMemes();
  }, []);

  // --- FUNÇÕES DE LÓGICA DA PÁGINA ---

  // A lógica de fetch foi simplificada para usar o serviço
  const fetchMemes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MemeApiService.getAllMemes();
      setMemes(data);
    } catch (err) {
      setError('Falha ao buscar os memes. O backend está rodando?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // A lógica de salvar agora usa os métodos create e update do serviço
  const handleSaveMeme = async (memeData) => {
    try {
      if (editingMeme) {
        await MemeApiService.updateMeme(editingMeme.id, memeData);
      } else {
        await MemeApiService.createMeme(memeData);
      }
      closeForm();
      fetchMemes(); // Re-carrega a lista para mostrar a alteração
    } catch (err) {
      setError('Não foi possível salvar o meme.');
      console.error(err);
    }
  };

  // A lógica de deletar usa o método delete do serviço
  const handleDeleteMeme = async (memeId) => {
    if (window.confirm('Tem certeza que deseja apagar este meme?')) {
      try {
        await MemeApiService.deleteMeme(memeId);
        fetchMemes(); // Re-carrega a lista
      } catch (err) {
        setError('Não foi possível apagar o meme.');
        console.error(err);
      }
    }
  };


  // --- FUNÇÕES DE CONTROLE DA UI (permanecem iguais) ---
  const openFormForCreate = () => {
    setEditingMeme(null);
    setIsFormVisible(true);
  };

  const openFormForEdit = (meme) => {
    setEditingMeme(meme);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingMeme(null);
  };


  // --- RENDERIZAÇÃO DO COMPONENTE (permanece igual) ---
  if (isLoading) {
    return <div className="text-center mt-8">Carregando memes...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Galeria de Memes</h1>
        <button
          onClick={openFormForCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Criar Novo Meme
        </button>
      </div>

      {isFormVisible && (
        <MemeForm 
          meme={editingMeme} 
          onSave={handleSaveMeme} 
          onCancel={closeForm} 
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <div key={meme.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
            <img src={meme.imageUrl || 'https://placehold.co/600x400?text=Sem+Imagem'} alt={meme.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{meme.title}</h2>
              <p className="text-gray-600 mb-4">{meme.description}</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => openFormForEdit(meme)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                <button onClick={() => handleDeleteMeme(meme.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Apagar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemeForm({ meme, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: meme?.title || '',
    description: meme?.description || '',
    imageUrl: meme?.imageUrl || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{meme ? 'Editar Meme' : 'Criar Novo Meme'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL da Imagem</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemePage;

