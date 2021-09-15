import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import { MovieItem_movie } from "../fragments/__generated__/MovieItem_movie.graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

interface Props {
  movie: MovieItem_movie | null;
}

export default function MovieImage({ movie }: Props) {
  const classes = useStyles();

  return (
    <ImageListItem key={movie?.backdrop}>
      <img src={movie?.backdrop} alt={movie?.title} />
      <ImageListItemBar
        title={movie?.title}
        subtitle={<span>by: {movie?.releaseDate}</span>}
        actionIcon={
          <IconButton
            aria-label={`info about ${movie?.title}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
