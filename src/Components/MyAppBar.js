import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MyAppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: 'red', color: 'black'}} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Facial Attributes Recognition
          </Typography>
          <Button color="inherit">13157019</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
