import { useState } from "react";
import environment from "./relay-env";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import MovieList from "./fragments/MovieList";
import MovieAppBar from "./components/MovieAppBar";
import MovieBottonBar from "./components/MovieBottonBar";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  });

  const movieNumber = 12;

  const setPageCallback = (after: string, before: string) => {
    setPage({ after, before });
  };

  const getVaribles = () => {
    if (page.after == "" && page.before == "") {
      return {
        first: movieNumber,
        last: movieNumber,
      };
    }

    if (page.after == "") {
      return {
        before: page.before,
        last: movieNumber,
      };
    }

    if (page.before == "") {
      return {
        after: page.after,
        first: movieNumber,
      };
    }

    return {
      after: undefined,
      before: undefined,
      first: movieNumber,
      last: movieNumber,
    };
  };

  const variables = getVaribles();

  return (
    <QueryRenderer
      environment={environment as any}
      query={query}
      render={({ error, props }: Props) => {
        if (error) {
          return (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
          );
        }
        if (!props) {
          return (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          );
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
