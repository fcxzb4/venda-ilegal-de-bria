import { useState, useEffect } from 'react';
import MemeApiService from '../../service/MemeService';

function MemePage() {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMeme, setEditingMeme] = useState(null);

  useEffect(() => {
    fetchMemes();
  }, []);

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

  const handleSaveMeme = async (memeData) => {
    try {
      if (editingMeme) {
        await MemeApiService.updateMeme(editingMeme.id, memeData);
      } else {
        await MemeApiService.createMeme(memeData);
      }
      closeForm();
      fetchMemes();
    } catch (err) {
      setError('Não foi possível salvar o meme.');
      console.error(err);
    }
  };

  const handleDeleteMeme = async (memeId) => {
    if (window.confirm('Tem certeza que deseja apagar este meme?')) {
      try {
        await MemeApiService.deleteMeme(memeId);
        fetchMemes();
      } catch (err) {
        setError('Não foi possível apagar o meme.');
        console.error(err);
      }
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff159] text-gray-800 font-semibold text-lg">
        Carregando memes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff159] font-sans text-gray-800">
      {/* HEADER estilo Mercado Livre */}
      <header className="bg-[#ffe600] py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Meme<span className="text-blue-600">Hub</span>
          </h1>
          <button
            onClick={openFormForCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition-colors"
          >
            + Criar Meme
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Galeria de Memes
          </h2>
          <p className="text-gray-700 text-sm">
            Crie, edite e compartilhe seus memes com o mundo 😎
          </p>
        </div>

        {isFormVisible && (
          <MemeForm meme={editingMeme} onSave={handleSaveMeme} onCancel={closeForm} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={meme.image || 'https://placehold.co/600x400?text=Sem+Imagem'}
                alt={meme.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{meme.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{meme.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openFormForEdit(meme)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteMeme(meme.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 border-t mt-10 text-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} MemeHub — inspirado no Mercado Livre 💛
      </footer>
    </div>
  );
}

function MemeForm({ meme, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: meme?.title || '',
    description: meme?.description || '',
    image: meme?.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {meme ? 'Editar Meme' : 'Criar Novo Meme'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              URL da Imagem
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemePage;
