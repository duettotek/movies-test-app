import { useState } from "react";
import environment from "./relay-env";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import MovieList from "./fragments/MovieList";
import MovieAppBar from "./components/MovieAppBar";
import MovieBottonBar from "./components/MovieBottonBar";

export const query = graphql`
  query AppQuery($after: String, $before: String, $first: Int, $last: Int) {
    ...MovieList_query
  }
`;
interface Props {
  error: Error | null;
  props: any;
}

function App() {
  const [page, setPage] = useState({
    after: "",
    before: "",
    first: 12,
    last: 12,
  });

  const setPageCallback = (
    after: string,
    before: string,
    first: number,
    last: number
  ) => {
    setPage({ after, before, first, last });
  };

  const getVaribles = () => {
    if (page.after == "" && page.before == "") {
      return {
        first: page.first,
        last: page.last,
      };
    }

    if (page.after == "") {
      return {
        before: page.before,
        last: 12,
      };
    }

    if (page.before == "") {
      return {
        after: page.after,
        first: 12,
      };
    }

    return {
      after: undefined,
      before: undefined,
      first: 12,
      last: 12,
    };
  };

  const variables = getVaribles();

  return (
    <QueryRenderer
      environment={environment as any}
      query={query}
      render={({ error, props }: Props) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading..</div>;
        }
        return (
          <>
            <MovieAppBar></MovieAppBar>
            {page ? (
              <MovieList query={props} setPage={setPageCallback}></MovieList>
            ) : (
              <></>
            )}
            <MovieBottonBar></MovieBottonBar>
          </>
        );
      }}
      variables={variables}
    />
  );
}

export default App;
