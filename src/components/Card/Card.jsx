import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import "./Card.css";

const getStatusIconColor = (status) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    case "unknown":
    default:
      return "gray";
  }
};

const Card = ({ character }) => {
  const statusIconColor = getStatusIconColor(character.status);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const extractEpisodeNumbers = (urls) => {
    return urls
      .map((url) => parseInt(url.match(/\/(\d+)\/?$/)?.[1]))
      .filter(Boolean);
  };

  const episodeNumbers = extractEpisodeNumbers(character.episode);

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
      style={{ cursor: "pointer" }}
    >
      <div className="front">
        <img src={character.image} alt={character.name} className="media" />
        <div className="text-container">
          <h2 className="title">{character.name}</h2>
          <div className="info-container">
            <div className="subtitle-container">
              <FaCircle
                style={{ color: statusIconColor }}
                className="status-icon"
              />
              <span className="subtitle">{`${character.status} - ${character.species}`}</span>
            </div>
            <div className="text">
              <div>
                <span className="subheading">Last Known Location:</span>{" "}
                {character.location.name}
              </div>
              <div>
                <span className="subheading">Gender:</span> {character.gender}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="back" style={{ justifyContent: "space-between" }}>
        <div className="text-container">
          <h2 className="title">{character.name}</h2>
          <div className="subtitle-container">
            <FaCircle
              style={{ color: statusIconColor }}
              className="status-icon"
            />
            <span className="subtitle">{`${character.status} - ${
              character.type || character.species
            }`}</span>
          </div>
          <span className="subheading">Last Episodes appears:</span>{" "}
          <div className="text episodes">
            <div
              className={`episode-info-container ${isFlipped ? "flipped" : ""}`}
            >
              {episodeNumbers.map((ep, index) => (
                <div className="badge" key={index}>
                  {ep}
                </div>
              ))}
            </div>
          </div>
        </div>
        <img
          style={{ filter: "contrast(150%) brightness(80%)" }}
          src={character.image}
          alt={character.name}
          className="media"
        />
      </div>
    </div>
  );
};

export default Card;
