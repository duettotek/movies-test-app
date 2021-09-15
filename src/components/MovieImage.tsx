import { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import MovieDetails from "../fragments/MovieDetails";

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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ImageListItem key={movie?.backdrop}>
        <img src={movie?.backdrop} alt={movie?.title} />
        <ImageListItemBar
          title={movie?.title}
          subtitle={<span>by: {movie?.releaseDate}</span>}
          actionIcon={
            <IconButton
              aria-label={`info about ${movie?.title}`}
              className={classes.icon}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
      {open && movie ? (
        <MovieDetails
          id={movie?.id}
          handleClickClose={handleClickClose}
        ></MovieDetails>
      ) : (
        <></>
      )}
    </>
  );
}
