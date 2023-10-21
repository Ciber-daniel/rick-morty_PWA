import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    margin: theme.spacing(2),
  },
  media: {
    width: 150,
    height: 150,
  },
}));

const CharacterCard = ({ character }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={character.image}
        title={character.name}
      />
      <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {character.name}
          </Typography>
          <Typography color="textSecondary">
            {`Status: ${character.status}`}
          </Typography>
          <Typography color="textSecondary">
            {`Species: ${character.species}`}
          </Typography>
          <Typography color="textSecondary">
            {`Location: ${character.location.name}`}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CharacterCard;
