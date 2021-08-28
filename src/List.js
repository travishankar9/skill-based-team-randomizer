import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  itemCard: {
    width: "96%",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
}));

function List({ items, removeItem, editItem }) {
  const classes = useStyles();
  return (
    <Grid>
      {items.map((item) => {
        return (
          <Grid item key={item.id} justifyContent="center" alignItems="center">
            <Card className={classes.itemCard} raised>
              <div>
                <Typography variant="h6">
                  {item.title}
                  {item.skill ? ` - Skill level: ${item.skill}` : null}
                </Typography>
              </div>
              <div>
                <IconButton
                  color="secondary"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
                <IconButton color="primary" onClick={() => editItem(item.id)}>
                  <EditIcon></EditIcon>
                </IconButton>
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default List;
