import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import CustomAlert from "./CustomAlert";
import List from "./List";

const useStyles = makeStyles({
  paperContainer: {
    padding: 50,
    marginBottom: 50,
  },
  formContainer: {
    marginBottom: 20,
  },
  cardTitle: {
    textAlign: "center",
    fontWeight: 800,
    marginBottom: 50,
    textShadow: "1px 1px 1px black",
  },
});

function TeamsForm({ setFullTeams }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    msg: "",
  });

  useEffect(() => {
    setFullTeams(list);
  }, [list, setFullTeams]);

  const showAlert = (show = false, severity = "", msg = "") => {
    setAlert({ show, severity, msg });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "error", "Each Team must have a name");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name, players: [], skillTotal: 0 };
          }
          return item;
        })
      );

      setEditId(null);
      setIsEditing(false);
      setName("");
      showAlert(true, "success", "Team has been edited");
    } else {
      const newTeam = {
        id: new Date().getTime().toString(),
        title: name,
        players: [],
        skillTotal: 0,
      };
      setList([...list, newTeam]);
      setName("");
      showAlert(true, "success", "Team has been added");
    }
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "error", "Team has been removed");
  };

  const editItem = (id) => {
    const player = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(player.title);
  };

  return (
    <Grid item>
      <Paper className={classes.paperContainer}>
        {alert.show && (
          <CustomAlert
            list={list}
            removeAlert={showAlert}
            {...alert}
          ></CustomAlert>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className={classes.formContainer}
        >
          <div>
            <Typography variant="h3" className={classes.cardTitle}>
              Teams
            </Typography>
          </div>
          <Grid container spacing={6} justifyContent="space-evenly">
            <Grid item>
              <TextField
                value={name}
                variant="outlined"
                label="Name of Team"
                placeholder="e.g. Barcelona"
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Edit Team" : "Add Team"}
              </Button>
            </Grid>

            <Grid></Grid>
          </Grid>
        </form>

        {list.length > 0 && (
          <List items={list} editItem={editItem} removeItem={removeItem}></List>
        )}
      </Paper>
    </Grid>
  );
}

export default TeamsForm;
