//import PokemonDetails from './PokemonDetails';
import React from "react";
import MovieDetails from "./MovieDetails";
import { MovieList_query } from "./__generated__/MovieList_query.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

interface Props {
  query: MovieList_query | null;
}

function MovieList({ query }: Props) {
  if (!query) {
    return <div>Error query</div>;
  }
  const { allMovies } = query;
  if (!allMovies) {
    return <div>Error movies</div>;
  }
  return (
    <>
      {allMovies.map((movie) =>
        movie ? <MovieDetails key={movie.id} movie={movie} /> : null
      )}
    </>
  );
}

export default createFragmentContainer(MovieList, {
  query: graphql`
    fragment MovieList_query on Query {
      allMovies {
        id
        ...MovieDetails_movie
      }
    }
  `,
});
