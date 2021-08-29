import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Slider,
  makeStyles,
} from "@material-ui/core";

import List from "./List";
import CustomAlert from "./CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperContainer: {
    padding: 50,
    marginBottom: 50,
  },

  cardTitle: {
    textAlign: "center",
    fontWeight: 800,
    marginBottom: 50,
    textShadow: "1px 1px 1px black",
  },

  formContainer: {
    marginBottom: 20,
  },
}));

function PlayersForm({ setMembers }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [skillLevel, setSkillLevel] = useState(1);
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    msg: "",
  });
  const refContainer = useRef(null);
  const showAlert = (show = false, severity = "", msg = "") => {
    setAlert({ show, severity, msg });
  };

  useEffect(() => {
    setMembers(list);
  }, [list, setMembers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // if the name is empty
      showAlert(true, "error", "Each player must have a name");
    } else if (name && isEditing) {
      // if there is a name and it is being edited
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, skill: skillLevel, title: name }; // if the item is the on being edited, return the edited item
          }
          return item; // otherwise just return the item as it is
        })
      );

      setEditId(null);
      setIsEditing(false);
      setName("");
      setSkillLevel(1);
      showAlert(true, "success", "Player has been edited");
    } else {
      const newPerson = {
        id: new Date().getTime().toString(),
        title: name,
        skill: skillLevel,
      };
      setList([...list, newPerson]);
      setName("");
      setSkillLevel(1);
      showAlert(true, "success", "Player has been added");
    }
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setMembers(list);
    showAlert(true, "error", "Player has been removed");
  };

  const editItem = (id) => {
    const player = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(player.title);
    setSkillLevel(player.skill);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (e, newValue) => {
    setSkillLevel(newValue);
  };

  return (
    <Grid item>
      {/* this is for the players Form */}
      <Paper className={classes.paperContainer} flex={2}>
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
              Players
            </Typography>
          </div>
          <Grid container spacing={6} justifyContent="space-evenly">
            <Grid item>
              <TextField
                ref={refContainer}
                value={name}
                variant="outlined"
                label="Name of player"
                placeholder="e.g. Messi"
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <div>
                <Typography id="discrete-slider" gutterBottom>
                  Skill Level
                </Typography>
                <Slider
                  value={skillLevel}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={handleChange}
                ></Slider>
              </div>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Edit Player" : "Add Player"}
              </Button>
            </Grid>

            <Grid></Grid>
          </Grid>
        </form>

        {list.length > 0 && (
          <List
            refContainer={refContainer}
            items={list}
            editItem={editItem}
            removeItem={removeItem}
          ></List>
        )}
      </Paper>
    </Grid>
  );
}

export default PlayersForm;
