import React from "react";
import { AuthContext, Auth } from "../Auth/Auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

export const Header: React.FC = props => {
  const classes = useStyles();

  const renderHeader = (auth: Auth) => {
    const renderTitle = () => {
      if (!auth.user) {
        return <LinearProgress color="secondary" />;
      }
      return (
        <Typography variant="h6" className={classes.title}>
          Hi {auth.user.given_name}.
        </Typography>
      );
    };

    return (
      <AppBar>
        <Toolbar>
          <div className={classes.title}>{renderTitle()}</div>
          <Button color="inherit" onClick={() => auth.logout()}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

  return <AuthContext.Consumer>{renderHeader}</AuthContext.Consumer>;
};
