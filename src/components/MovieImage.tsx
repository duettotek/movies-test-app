import { useState, Suspense } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Moment from "react-moment";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MovieDetails from "../fragments/MovieDetails";

import { MovieItem_movie } from "../fragments/__generated__/MovieItem_movie.graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    bar: {
      height: 90,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
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

  const starRateIcon = [];
  if (movie) {
    for (var i = 0; i < movie?.rating; i++) {
      starRateIcon.push(<StarIcon></StarIcon>);
    }
  }

  return (
    <Suspense
      fallback={
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <ImageListItem key={movie?.backdrop}>
        <img src={movie?.backdrop} alt={movie?.title} />
        <ImageListItemBar
          className={classes.bar}
          title={movie?.title}
          subtitle={<Moment format="YYYY/MM/DD">{movie?.releaseDate}</Moment>}
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
        <div>
          {movie?.rating == 0 ? (
            <StarBorderIcon></StarBorderIcon>
          ) : (
            starRateIcon
          )}
        </div>
      </ImageListItem>
      {open && movie ? (
        <MovieDetails
          id={movie?.id}
          handleClickClose={handleClickClose}
        ></MovieDetails>
      ) : (
        <></>
      )}
    </Suspense>
  );
}
