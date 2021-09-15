import React from "react";
import { MovieDetails_movie } from "./__generated__/MovieDetails_movie.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieReviewCard from "../components/MovieReviewCard";

interface Props {
  movie: MovieDetails_movie | null;
}

function MovieDetails({ movie }: Props) {
  if (!movie) {
    return <div></div>;
  }
  //return <MovieReviewCard movie={movie}></MovieReviewCard>;
  return <div></div>
}

export default createFragmentContainer(MovieDetails, {
  movie: graphql`
    fragment MovieDetails_movie on Movie {
      id
      title
      backdrop(size: W300)
    }
  `,
});
