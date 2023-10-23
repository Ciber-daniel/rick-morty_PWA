import React, { useState, useEffect } from "react";

// styles
import "./ListContainer.css";

// components
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Dropdown from "../Dropdown/Dropdown";
import Spinner from "../Spinner/Spinner";

// utils
import { fetchData } from "../../utils/api.util";
import { calculateChartData } from "../../utils/chartData.util";

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

        const { characters: fetchedCharacters, totalPages } = await fetchData(
          page
        );

        setTotalPages(totalPages);
        setCharacters(fetchedCharacters);

        const { genders, statuses, types } =
          calculateChartData(fetchedCharacters);

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
          <Spinner />
        </div>
      ) : (
        <>
          {characters.length > 0 ? (
            <Dropdown
              chartData={chartData}
              setChartData={setChartData}
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              loading={loading}
            />
          ) : (
            ""
          )}
          <div className="container">
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
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
