import { useState } from "react";
import environment from "./relay-env";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import MovieList from "./fragments/MovieList";
import MovieAppBar from "./components/MovieAppBar";
import MovieBottonBar from "./components/MovieBottonBar";

import { Suspense } from "react";

export const query = graphql`
  query AppQuery($first: Int!, $last: Int!) {
    ...MovieList_query
  }
`;
interface Props {
  error: Error | null;
  props: any;
}

function App() {
  const [page, setPage] = useState({ first: 10, last: 10 });

  const setPageCallback = (first: number, last: number) => {
    console.log(first + last);
    setPage({ first, last });
  };

  return (
    <Suspense fallback={<div>Loading..</div>}>
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
              <MovieList query={props} setPage={setPageCallback}></MovieList>
              <MovieBottonBar></MovieBottonBar>
            </>
          );
        }}
        variables={{ first: page.first, last: page.last }}
      />
    </Suspense>
  );
}

export default App;
