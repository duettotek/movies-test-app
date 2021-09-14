//import PokemonDetails from './PokemonDetails';
import React from "react";
import MovieDetails from "./MovieDetails";
import { MovieList_query } from "./__generated__/MovieList_query.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieItem from "./MovieItem";
import MovieImageList from "./components/MovieImageList";
import { MovieItem_movie } from "./__generated__/MovieItem_movie.graphql";

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

  const movieArray = Array.from(movies.trending.edges, (node) => (node?.node));

  return (
    /*<>
      {movies.trending.edges.map((movie) =>
        movie && movie.node ? <MovieItem movie={movie.node} /> : null
      )}
    </>*/
    <MovieImageList movies={movieArray} />
  );
}

export default createFragmentContainer(MovieList, {
  query: graphql`
    fragment MovieList_query on Query {
      movies {
        trending(first: $first, last: $last) {
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
