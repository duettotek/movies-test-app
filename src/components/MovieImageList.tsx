import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import MovieItem from "../fragments/MovieItem";
import { Fab, Grid, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 50,
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      width: 300,
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  movies: any[];
  setPage: (first: number, last: number) => void;
}

export default function MovieImageList({ movies, setPage }: Props) {
  const classes = useStyles();

  if (!movies) {
    return <div>Error movies</div>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {movies.map((movie) =>
          movie ? (
            <Grid container item xs={4} spacing={1}>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Paper className={classes.paper}>
                  <MovieItem movie={movie} />
                </Paper>
              </Grid>
            </Grid>
          ) : null
        )}
      </Grid>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={() => {
          setPage(20, 10);
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
