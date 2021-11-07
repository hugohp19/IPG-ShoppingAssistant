import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import swal from "sweetalert";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.password !== password.confirmPassword) {
        swal({ icon: "error", text: "Passwords must match." });
        return;
      }
      await axios.put(
        "/api/users/password",
        { password: password.password },
        { withCredentials: true }
      );
      swal("Updated!", "Your password has been updated!");
      history.push("/login");
    } catch (error) {
      swal({ icon: "error", text: "Something went wrong." });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Update Password
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login">Go Back to Log In</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default UpdatePassword;
