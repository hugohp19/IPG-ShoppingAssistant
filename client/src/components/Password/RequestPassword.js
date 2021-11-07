import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import swal from "sweetalert";

const RequestPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `api/password?email=${email}`,
        data: email,
        withCredentials: "include",
      });
      if (response) {
        swal(
          "Email sent",
          "Check your email for a link to reset your password."
        );
      }
      history.push("/login");
    } catch (error) {
      swal({
        icon: "error",
        text: "Email not found",
      });
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Typography variant="p" center>
            We'll email you a link to reset your password.
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={loading}
          >
            Send
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

export default RequestPassword;
