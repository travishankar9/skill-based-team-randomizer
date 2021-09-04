import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  alert: {
    marginBottom: 20,
  },
});

const CustomAlert = ({ msg, severity, removeAlert, list = [] }) => {
  const classes = useStyles();
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(); //resets alert to base values
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [removeAlert, list]);
  return (
    <Alert className={classes.alert} severity={severity}>
      {msg}
    </Alert>
  );
};

export default CustomAlert;
