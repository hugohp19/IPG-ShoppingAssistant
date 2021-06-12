import React, { useState, useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiPhoneNumber from 'material-ui-phone-number'

const UpdateProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading ] = useState(false);
  const history = useHistory();

  console.log(currentUser)

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
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
    console.log(userInfo)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      // await signup(userInfo.email, userInfo.password)
      // .then((userCredential) => {
      //   // Signed in 
      //   console.log('inside then')
      //   let user = userCredential.user;
      //   console.log(user)
      //   try{
      //     console.log('inside user')
      //     app.database().ref('users/' + user.uid).set({
      //       firstName: userInfo.firstName,
      //       lastName: userInfo.lastName,
      //       phone: userInfo.phoneNumber,
      //     })
      //     console.log('should be saved')
      //     history.push('/catalogo');
      //   }catch(err){
      //     console.log('unable top add info. ', err)
      //   }
      // })
      setLoading(true)
    } catch (error) {
      console.log('Failed to create an account')
    }
    
    setLoading(false)
  }


  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{handleSubmit(e)}} onChange={(e)=>{handleChange(e)}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={currentUser.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneNumber
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="Telefono"
                type="phone"
                id="phoneNumber"
                data-cy="user-phone"
                    defaultCountry={"us"}
                autoComplete="current-password"
                // defaultValue={currentUs}
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
            Update Profile
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default UpdateProfile;