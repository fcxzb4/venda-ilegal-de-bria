import Card from "../card/Card";
import styles from "./mainscreen.module.scss";

function MainScreen({ cards, onEdit, onDelete }) {
  return (
    <div className={styles.mainScreenGrid}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MainScreen;
