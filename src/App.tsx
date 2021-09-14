import MovieList from './MovieList';
import React from 'react';
import environment from './relay-env';
import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

const query = graphql`
  query AppQuery($first: Int!){
    ...MovieList_query
  }
`
interface Props {
  error: Error | null;
  props: any;
}

const renderComponent = ({ error, props }: Props) => {
  if(error) {
    return <div>Error!</div>;
  }
  if(!props) {
    return <div>Loading..</div>;
  }
  return <MovieList query={props} />;
};

function App() {
  return (
    <QueryRenderer
      environment={environment as any}
      query={query}
      render={renderComponent}
      variables={{ first: 10 }}
    />
  );
}

export default App;