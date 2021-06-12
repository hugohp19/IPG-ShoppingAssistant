import React, { useState, useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const ForgotPassword = () => {
  const [userInfo, setUserInfo] = useState({});
  //const { resetPassword } = useContext(AuthContext);
  const [loading, setLoading ] = useState(false);
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const handleChange = (e) =>{
    e.preventDefault();
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
     // await resetPassword(userInfo.email);
      console.log('check you email for next instructions')
      setLoading(true)
    } catch (error) {
      console.log('Failed to Reset Password')
    }
    
    setLoading(false)
  }


  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{handleSubmit(e)}} onChange={(e)=>{handleChange(e)}}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>{handleSubmit(e)}}
            disabled={loading}
          >
            Reset
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to='/login'>
                Log In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ForgotPassword;