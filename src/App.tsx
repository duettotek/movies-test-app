import React from "react";
import environment from "./relay-env";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import MovieList from "./fragments/MovieList";
import MovieAppBar from "./components/MovieAppBar";
import MovieBottonBar from "./components/MovieBottonBar";

const query = graphql`
  query AppQuery($first: Int!, $last: Int!) {
    ...MovieList_query
  }
`;
interface Props {
  error: Error | null;
  props: any;
}

const renderComponent = ({ error, props }: Props) => {
  if (error) {
    return <div>Error!</div>;
  }
  if (!props) {
    return <div>Loading..</div>;
  }
  return (
    <>
      <MovieAppBar></MovieAppBar>
      <MovieList query={props}> </MovieList>
      <MovieBottonBar></MovieBottonBar>
    </>
  );
};

function App() {
  return (
    <QueryRenderer
      environment={environment as any}
      query={query}
      render={renderComponent}
      variables={{ first: 10, last: 10 }}
    />
  );
}

export default App;
