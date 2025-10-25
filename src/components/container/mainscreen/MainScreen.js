import Card  from "../card/Card";

function MainScreen({ cards, onEdit, onDelete, onAddNew }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Cartão especial para adicionar um novo item */}
      <div
        onClick={onAddNew}
        className="cursor-pointer bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center min-h-[300px] text-slate-400 hover:bg-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300"
      >
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="mt-2 block font-semibold">Novo Cartão</span>
        </div>
      </div>
      {/* Mapeia e exibe os cartões existentes */}
      {cards.map((card) => (
        <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default MainScreen;
