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
      listStyle: "none",
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
  setPage: (after: any, before: any, first: number, last: number) => void;
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
  };
}

export default function MovieImageList({ movies, setPage, pageInfo }: Props) {
  const classes = useStyles();

  if (!movies) {
    return <div>Error movies</div>;
  }

  const right = () => {
    setPage(pageInfo.endCursor, "", 12, 12);
  };

  const left = () => {
    setPage("", pageInfo.startCursor, 12, 12);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {movies.map((movie) =>
          movie ? (
            <Grid container item xs={5} md={4} lg={3} xl={3}>
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
      {pageInfo.hasPreviousPage ? (
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

      {pageInfo.hasNextPage ? (
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabRight}
          onClick={right}
        >
          <ChevronRightIcon />
        </Fab>
      ) : (
        <div></div>
      )}
    </div>
  );
}
