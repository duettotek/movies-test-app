//import PokemonDetails from './PokemonDetails';
import React from "react";
import MovieDetails from "./MovieDetails";
import { MovieList_query } from "./__generated__/MovieList_query.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieItem from "./MovieItem";

interface Props {
  query: MovieList_query | null;
}

function MovieList({ query }: Props) {
  if (!query) {
    return <div>Error query</div>;
  }
  const { movies } = query;
  if (!movies.trending.edges) {
    return <div>Error movies</div>;
  }
  return (
    <>
      {movies.trending.edges.map((movie) =>
        movie && movie.node ? <MovieItem movie={movie.node} /> : null
      )}
    </>
  );
}

export default createFragmentContainer(MovieList, {
  query: graphql`
    fragment MovieList_query on Query {
      movies {
        trending(first: $first, last: 10) {
          edges {
            node {
              ...MovieItem_movie
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          totalCount
        }
      }
    }
  `,
});
