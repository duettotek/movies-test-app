import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MovieDialog from "../components/MovieDialog";
import { MovieDetailsQuery } from "../fragments/__generated__/MovieDetailsQuery.graphql";

interface Props {
  id: string;
  handleClickClose: () => void;
}

export default function MovieDetails({ id, handleClickClose }: Props) {
  const data = useLazyLoadQuery<MovieDetailsQuery>(
    graphql`
      query MovieDetailsQuery($id: ID!) {
        movies {
          movie(id: $id) {
            title
            overview
            tagline
          }
        }
      }
    `,
    { id: id },
    { fetchPolicy: "store-or-network" }
  );

  return (
    <MovieDialog
      movie={data.movies.movie}
      handleClickClose={handleClickClose}
    />
  );
}
