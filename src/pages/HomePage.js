import style from './home_page.module.scss'
import MainScreen from '../components/mainscreen/MainScreen';
import CardForm from '../components/cardform/CardForm';
import { useCardLogic } from '../hooks/home_page_hooks'; // 1. Importa o novo hook

function HomePage() {
  // 2. Chama o hook para pegar toda a lógica e estado
  const {
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
  } = useCardLogic();

  // 3. O componente agora é 100% focado na renderização
  
  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Ocorreu um erro ao buscar os dados.</div>;
  }


return (
    <div className={style.pageContainer}> {/* Classe para o container principal */}
      
      {/* Header fixo estilo Mercado Livre */}
      <header className={style.header}>
        <h1 className={style.logo}>
          Mercado<span className={style.logoSpan}>Manager</span>
        </h1>
        <button
          onClick={handleAddNew}
          className={style.newProductButton}
        >
          + Novo Produto
        </button>
      </header>

      {/* Conteúdo */}
      <div className={style.mainContent}>
        <div className={style.pageTitleContainer}>
          <h2 className={style.pageTitle}>
            Gerencie seus produtos
          </h2>
          <p className={style.pageSubtitle}>
            Adicione, edite ou remova produtos de forma simples e rápida.
          </p>
        </div>

        <main className={style.cardGridContainer}>
          {isLoading ? (
            <p className={style.loadingText}>Carregando produtos...</p>
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
      <footer className={style.footer}>
        <p>
          © {new Date().getFullYear()} MercadoManager — inspirado no Mercado Livre
        </p>
      </footer>
    </div>
  );
}

export default HomePage;


