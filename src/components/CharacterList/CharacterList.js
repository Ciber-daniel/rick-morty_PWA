import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../Common/Card";

const styles = {
  container: {
    padding: "16px",
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "8px 16px",
    margin: "0 4px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "transparent",
  },
  activeButton: {
    padding: "8px 16px",
    margin: "0 4px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

const ListContainer = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setTotalPages(response.data.info.pages);
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const maxButtons = page < 5 || page > totalPages - 5 ? 7 : 6;

    let startPage = Math.max(
      1,
      Math.min(page - Math.floor(maxButtons / 2), totalPages - maxButtons + 1)
    );

    if (startPage + maxButtons > totalPages) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    const paginationButtons = [];

    for (
      let i = startPage;
      i < startPage + maxButtons && i <= totalPages;
      i++
    ) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={page === i ? styles.activeButton : styles.button}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      paginationButtons.unshift(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          style={styles.button}
        >
          1
        </button>
      );
    }

    if (startPage + maxButtons - 1 < totalPages) {
      paginationButtons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          style={styles.button}
        >
          {totalPages}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <>
      {loading ? (
        <div style={styles.loadingContainer}>
          <div>Loading...</div>
        </div>
      ) : (
        <div style={styles.container}>
          {characters.map((character) => (
            <div key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))}
          <div style={styles.pagination}>{renderPaginationButtons()}</div>
        </div>
      )}
    </>
  );
};

export default ListContainer;
