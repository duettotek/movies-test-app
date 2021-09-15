import React from "react";
import { MovieItem_movie } from "./__generated__/MovieItem_movie.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieImage from "../components/MovieImage";

interface Props {
  movie: MovieItem_movie | null;
}

function MovieItem({ movie }: Props) {
  if (!movie) {
    return <div></div>;
  }
  return <MovieImage movie={movie}></MovieImage>;
}

export default createFragmentContainer(MovieItem, {
  movie: graphql`
    fragment MovieItem_movie on Movie {
      id
      title
      backdrop(size: W300)
      releaseDate
    }
  `,
});
