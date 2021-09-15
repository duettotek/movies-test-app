import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import MovieItem from "../fragments/MovieItem";
import { Fab, Grid, Paper } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
    fabRight: {
      position: "fixed",
      bottom: theme.spacing(8),
      right: theme.spacing(2),
    },
    fabLeft: {
      position: "fixed",
      bottom: theme.spacing(8),
      left: theme.spacing(2),
    },
  })
);

interface Props {
  movies: any[];
  setPage: (first: number, last: number) => void;
  page: { first: number; last: number };
}

export default function MovieImageList({ movies, setPage, page }: Props) {
  const classes = useStyles();

  if (!movies) {
    return <div>Error movies</div>;
  }

  const right = () => {
    setPage(page.first + 12, 12);
  };

  const left = () => {
    setPage(page.first - 12, 12);
  };

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
      {page.first > 12 ? (
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabLeft}
          onClick={left}
        >
          <ChevronLeftIcon />
        </Fab>
      ) : (
        <div></div>
      )}

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fabRight}
        onClick={right}
      >
        <ChevronRightIcon />
      </Fab>
    </div>
  );
}
