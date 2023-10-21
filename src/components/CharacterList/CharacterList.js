import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import CharacterCard from "../Common/Card";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    marginTop: theme.spacing(4),
  },
}));

const ListContainer = () => {
  const classes = useStyles();
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
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={page === i ? "contained" : "text"}
        >
          {i}
        </Button>
      );
    }

    if (startPage > 1) {
      paginationButtons.unshift(
        <Button key="first" onClick={() => handlePageChange(1)}>
          1
        </Button>
      );
    }

    if (startPage + maxButtons - 1 < totalPages) {
      paginationButtons.push(
        <Button key="last" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    return paginationButtons;
  };

  return (
    <>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.container}>
          <Grid container spacing={3}>
            {characters.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                <CharacterCard character={character} />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.pagination}
          >
            {renderPaginationButtons()}
          </Grid>
        </div>
      )}
    </>
  );
};

export default ListContainer;
