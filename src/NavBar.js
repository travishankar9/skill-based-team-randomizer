import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  spacing: {
    marginBottom: 100,
  },
}));

function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.spacing}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <SportsSoccerIcon />
          <SportsFootballIcon />
          <SportsEsportsIcon />
        </IconButton>
        <Typography variant="h5">Skill Based Team Maker</Typography>
      </Toolbar>
    </AppBar>
  );
}
// TODO styling of Navbar to make it look better

export default NavBar;
