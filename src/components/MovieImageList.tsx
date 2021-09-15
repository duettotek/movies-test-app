import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import MovieItem from "../MovieItem";
import { MovieItem_movie } from "../__generated__/MovieItem_movie.graphql";
import { MovieList_query } from "../__generated__/MovieList_query.graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 900,
    },
  })
);

interface Props {
  movies: any[];
}

export default function MovieImageList({ movies }: Props) {
  const classes = useStyles();

  if (!movies) {
    return <div>Error movies</div>;
  }

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={3} style={{ height: "auto" }}>
        </ImageListItem>
        {movies.map((movie) =>
          movie ? <MovieItem movie={movie} /> : null
        )}
      </ImageList>
    </div>
  );
}
