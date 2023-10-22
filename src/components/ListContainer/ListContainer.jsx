import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./ListContainer.css";

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
          className={page === i ? "activeButton" : "button"}
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
          className="button"
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
          className="button"
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
        <div className="loadingContainer">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <div className="container">
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
          <div className="pagination">{renderPaginationButtons()}</div>
        </>
      )}
    </>
  );
};

export default ListContainer;
