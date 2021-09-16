import { MovieList_query } from "./__generated__/MovieList_query.graphql";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieImageList from "../components/MovieImageList";

interface Props {
  query: MovieList_query | null;
  setPage: (after: any, before: any, first: number, last: number) => void;
}

function MovieList({ query, setPage }: Props) {
  if (!query) {
    return <div>Error query</div>;
  }

  const { movies } = query;
  if (!movies.trending.edges) {
    return <div>Error movies</div>;
  }

  const movieArray = Array.from(movies.trending.edges, (node) => node?.node);

  return (
    <MovieImageList
      movies={movieArray}
      setPage={setPage}
      pageInfo={movies.trending.pageInfo}
    />
  );
}

export default createFragmentContainer(MovieList, {
  query: graphql`
    fragment MovieList_query on Query {
      movies {
        trending(after: $after, before: $before, first: $first, last: $last) {
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
