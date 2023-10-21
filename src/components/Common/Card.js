import React from "react";

const styles = {
  card: {
    display: "flex",
    margin: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxWidth: "400px",
  },
  media: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px 0 0 4px",
  },
  content: {
    padding: "16px",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "8px",
  },
  text: {
    marginBottom: "4px",
  },
};

const CharacterCard = ({ character }) => {
  return (
    <div style={styles.card}>
      <img src={character.image} alt={character.name} style={styles.media} />
      <div style={styles.content}>
        <div style={styles.title}>{character.name}</div>
        <div style={styles.text}>{`Status: ${character.status}`}</div>
        <div style={styles.text}>{`Species: ${character.species}`}</div>
        <div style={styles.text}>{`Location: ${character.location.name}`}</div>
      </div>
    </div>
  );
};

export default CharacterCard;
