import React from 'react';
import { MovieDetails_movie } from './__generated__/MovieDetails_movie.graphql';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

interface Props {
  movie: MovieDetails_movie | null;
}

function MovieDetails({ movie }: Props) {
  if(!movie) {
    return <div></div>
  }
  const { id, title, plot } = movie;
  return (
    <div key={id}>{`${title} - ${plot}`}</div>
  );
}

export default createFragmentContainer(
    MovieDetails,
  {
    movie: graphql`
      fragment MovieDetails_movie on Movie {
        id
        title
        plot
      }
    `
  }
);