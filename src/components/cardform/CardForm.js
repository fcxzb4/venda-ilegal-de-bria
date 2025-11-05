import { useCardFormLogic } from "../../hooks/card_form_hooks";
import style from "./cardform.module.scss";

// --- COMPONENTE DO FORMULÁRIO (CardForm) ---
// Um formulário modal para criar ou editar um cartão.
function CardForm({ card, onSave, onCancel }) {
  // Estado para os campos do formulário

  const { formData, handleChange, handleSubmit } = useCardFormLogic({
    card,
    onSave,
  });

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <h2 className={style.modalTitle}>
          {card ? "Editar Produto" : "Criar Novo Produto"}
        </h2>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputsGrid}>
            {/* Título */}
            <div className={style.inputGroup}>
              <label htmlFor="title" className={style.label}>
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Tênis de Corrida"
                required
                className={style.input}
              />
            </div>

            {/* Preço */}
            <div className={style.inputGroup}>
              <label htmlFor="price" className={style.label}>
                Preço
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 299.90"
                required
                className={style.input}
              />
            </div>

            {/* Descrição */}
            <div className={style.inputGroupSpanFull}>
              <label htmlFor="description" className={style.label}>
                Descrição
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição curta do produto..."
                rows="4"
                className={style.textarea}
              />
            </div>

            {/* URL da Imagem */}
            <div className={style.inputGroupSpanFull}>
              <label htmlFor="image" className={style.label}>
                URL da Imagem
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://... (opcional)"
                className={style.input}
              />
            </div>

            {/* Em Estoque (Checkbox) */}
            <div
              className={`${style.inputGroupSpanFull} ${style.checkboxGroup}`}
            >
              <input
                type="checkbox"
                name="stock"
                id="stock"
                checked={formData.stock} // Usamos 'checked' para checkbox
                onChange={handleChange}
                className={style.checkbox}
              />
              <label htmlFor="stock" className={style.checkboxLabel}>
                Produto em estoque
              </label>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className={style.buttonGroup}>
            <button
              type="button"
              onClick={onCancel}
              className={`${style.button} ${style.cancelButton}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${style.button} ${style.saveButton}`}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
