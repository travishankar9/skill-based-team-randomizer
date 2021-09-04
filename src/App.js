import React, { useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import PlayersForm from "./PlayersForm";
import TeamsForm from "./TeamsForm";
import TeamsDisplay from "./TeamsDisplay";

import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  spacing: {
    marginBottom: 100,
  },
  paperContainer: {
    padding: 50,
    marginBottom: 20,
  },
  aboutText: {
    textAlign: "center",
    fontWeight: 600,
  },
  aboutTitle: {
    textAlign: "center",
    fontWeight: 800,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.spacing}>
        <Paper elevation={3} className={classes.paperContainer}>
          <div className={classes.aboutText}>
            <Typography
              color="primary"
              variant="h3"
              className={classes.aboutTitle}
            >
              About
            </Typography>
            <p>
              <Typography variant="body1">
                Skill Based Team Maker is an app that allows you to make
                balanced teams for events by taking in consideration the skill
                level of each player/member involved. The app requires you enter
                the names of the of the people involved along with a skill
                rating ranging from 1-5 for each participant. You can also enter
                your preferred team names and the algorithm will then sort the
                players into these teams, ensuring they are perfectly balanced!
              </Typography>
            </p>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

function App() {
  const [members, setMembers] = useState([]);
  const [fullTeam, setFullTeams] = useState([]);

  return (
    <>
      <NavBar></NavBar>
      <About></About>

      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <PlayersForm setMembers={setMembers}></PlayersForm>
          </Grid>
          <Grid item>
            <TeamsForm setFullTeams={setFullTeams}></TeamsForm>
          </Grid>
        </Grid>

        <TeamsDisplay teams={fullTeam} players={members}></TeamsDisplay>
      </Container>
    </>
  );
}

export default App;
