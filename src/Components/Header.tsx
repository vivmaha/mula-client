import React from "react";
import { AuthContext, Auth } from "../Auth/Auth";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
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
    const userName = auth.user
      ? auth.user.name
      : "[still loading user name ...]";

    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Hi {userName}.
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  };

  return <AuthContext.Consumer>{renderHeader}</AuthContext.Consumer>;
};
