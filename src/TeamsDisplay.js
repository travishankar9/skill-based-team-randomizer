import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Button,
  Paper,
  Typography,
  Card,
  IconButton,
} from "@material-ui/core";

import CustomAlert from "./CustomAlert";

import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles({
  buttonContainer: {
    marginBottom: 50,
    marginTop: 15,
  },
  paperContainer: {
    padding: 50,
    marginBottom: 50,
  },
  teamTextContainer: {
    textAlign: "center",
    marginBottom: 30,
  },

  teamText: {
    textAlign: "center",
    fontWeight: 600,
  },

  teamTitle: {
    textAlign: "center",
    fontWeight: 800,
    marginBottom: 10,
    textShadow: "1px 1px 1px black",
  },

  teamSkill: {
    textAlign: "center",
    fontWeight: 400,
  },
  itemCard: {
    width: "92%",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

const TeamsDisplay = ({ teams, players }) => {
  const [finalTeams, setFinalTeams] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    msg: "",
  });
  const classes = useStyles();
  let sortedPlayers, sortedfinalTeams;

  const showAlert = (show = false, severity = "", msg = "") => {
    setAlert({ show, severity, msg });
  };

  useEffect(() => {
    setFinalTeams([]);
    // sortedPlayers = null;
    // sortedfinalTeams = null;
  }, [players, teams]);

  // console.log(teams, "teams before sort");
  // console.log(players, "players before sort ");

  const generateTeams = () => {
    sortedPlayers = JSON.parse(JSON.stringify(players));
    // console.log(sortedPlayers[0], "sortedPlayers");
    // console.log(players[0], "players");

    sortedPlayers = sortedPlayers.sort((a, b) => {
      if (a.skill > b.skill) {
        return 1;
      } else if (b.skill > a.skill) {
        return -1;
      } else {
        return 0;
      }
    });

    sortedfinalTeams = JSON.parse(JSON.stringify(teams)); // creating deep copy
    // console.log(finalTeams[0], "final Teams");
    // console.log(teams, "Teams");
    while (sortedPlayers.length > 0) {
      sortedfinalTeams = sortedfinalTeams.sort((a, b) => {
        if (a.skillTotal > b.skillTotal) {
          return 1;
        } else if (b.skillTotal > a.skillTotal) {
          return -1;
        } else {
          return 0;
        }
      });

      // console.log(teams, "teams after sort");
      // console.log(players[0], "players after sort ");

      const skill = sortedPlayers[sortedPlayers.length - 1].skill;
      sortedfinalTeams[0].skillTotal += skill;
      sortedfinalTeams[0].players.push(sortedPlayers.pop());

      // console.log(sortedPlayers[0], "sortedPlayers after pop");
      // console.log(players[0], "players after pop");
    }
    setFinalTeams(sortedfinalTeams);
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.buttonContainer}
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            disabled={teams.length < 1 || players.length < 1 ? true : false}
            onClick={generateTeams}
          >
            Create Teams
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {finalTeams.length > 0 &&
          finalTeams.map((team) => {
            const { id, players, title, skillTotal } = team;
            return (
              <Grid item key={id}>
                <Paper className={classes.paperContainer}>
                  {alert.show && (
                    <CustomAlert
                      removeAlert={showAlert}
                      {...alert}
                    ></CustomAlert>
                  )}
                  <div className={classes.teamTextContainer}>
                    <Typography variant="h3" className={classes.teamTitle}>
                      Team: {title.toUpperCase()}
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          const teamName = title;
                          const playerNames = players
                            .map((player) => {
                              return player.title;
                            })
                            .join("\n");

                          const fullTeam = `Team: ${teamName} \n\n${playerNames}`;
                          navigator.clipboard.writeText(fullTeam);
                          showAlert(
                            true,
                            "info",
                            "Text has been copied to clipboard"
                          );
                        }}
                      >
                        <FileCopyIcon></FileCopyIcon>
                      </IconButton>
                    </Typography>
                    <Typography variant="body2" className={classes.teamSkill}>
                      Skill Level: {skillTotal}
                    </Typography>
                  </div>

                  {players.map((player) => {
                    return (
                      <Grid item key={player.id}>
                        <Card
                          style={{ justifyContent: "center" }}
                          className={classes.itemCard}
                          raised
                          key={player.id}
                        >
                          <div>
                            <Typography
                              variant="h6"
                              className={classes.teamText}
                            >
                              {player.title}
                            </Typography>
                          </div>
                        </Card>
                      </Grid>
                    );
                  })}
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default TeamsDisplay;
