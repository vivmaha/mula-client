import React from "react";
import "./App.css";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default App;
