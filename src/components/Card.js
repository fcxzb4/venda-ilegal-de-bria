// --- COMPONENTE DO CARTÃO (Card) ---
// Representa um único cartão na grade.
function Card({ card, onEdit, onDelete }) {
  // Imagem de fallback caso a URL da imagem falhe
  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/600x400/94a3b8/ffffff?text=Erro!`;
  };

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-2">
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-48 object-cover"
        onError={handleImageError}
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
        <p className="text-slate-400 text-sm flex-grow mb-4">{card.description}</p>
        <div className="flex justify-end space-x-3 mt-auto pt-4 border-t border-slate-700">
           {/* Botão de Editar */}
          <button onClick={() => onEdit(card)} className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors">
            Editar
          </button>
           {/* Botão de Deletar */}
          <button onClick={() => onDelete(card.id)} className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;