import React from "react";
import "./Spinner.css"; // Asegúrate de ajustar la ruta al archivo CSS

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
