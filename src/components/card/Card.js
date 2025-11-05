import style from "./card.module.scss";

function Card({ card, onEdit, onDelete }) {
  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/600x400/94a3b8/ffffff?text=Erro!`;
  };

  return (
    <div className={style.cardContainer}>
      <img
        src={card.image}
        alt={card.title}
        className={style.cardImage}
        onError={handleImageError}
      />
      <h3 className={style.cardTitle}>{card.title}</h3>
      <p className={style.cardPrice}>R$ {card.price}</p>
      <p className={style.cardDescription}>{card.description}</p>
      <div className={style.cardActions}>
        <button className={style.edit} onClick={() => onEdit(card)}>
          Editar
        </button>
        <button className={style.delete} onClick={() => onDelete(card.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default Card;
