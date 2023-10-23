import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./ListContainer.css";
import Pagination from "../Pagination/Pagination";
import Dropdown from "../Dropdown/Dropdown";

const ListContainer = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setTotalPages(response.data.info.pages);
        setCharacters(response.data.results);

        // Calculate chart data
        const types = {};
        const genders = {};
        const statuses = {};

        response.data.results.forEach((character) => {
          const type = character.type.trim() || "Human";
          const gender = character.gender.trim() || "Unknown";
          const status = character.status.trim() || "Unknown";
          types[type] = (types[type] || 0) + 1;
          genders[gender] = (genders[gender] || 0) + 1;
          statuses[status] = (statuses[status] || 0) + 1;
        });

        setChartData({
          types,
          genders,
          statuses,
        });
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

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <div className="container">
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
          <Dropdown
            chartData={chartData}
            setChartData={setChartData}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            loading={loading}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default ListContainer;
