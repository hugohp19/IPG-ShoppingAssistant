import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import TextField from "@material-ui/core/TextField";
import swal from 'sweetalert';
import axios from 'axios';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStylesSecondary = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Formulario({ open, handleClose }) {
  const classes = useStylesSecondary();

  const [userInfo, setUserInfo] = useState({})
  const [userError, setUserError] = useState({})

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handelChange = (e, type) =>{
    setUserInfo({...userInfo, [type]: e.target.value})
  }
  const handelSubmit = (e, type) =>{
    if(!userInfo.nombre || !userInfo.apellido || !userInfo.telefono || !userInfo.tienda || !userInfo.presupuesto || !userInfo.nota){
      console.log('info missing')
      return;
    } 

    if(!validateEmail(userInfo.email)){
      swal({ text: 'Invalid Email', icon: "error"});
      return;
    }

    try{
      axios.post('/api/sendFormulario', userInfo);
      handleClose();
    }catch(error){
      console.log(error)
    }
  }


  return (
    <div >
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <ContactMailIcon />
        </DialogTitle>
        <DialogContent dividers >
          <form className={classes.root} noValidate autoComplete="off">
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <TextField required id="standard-required" label="Nombre" onChange={(e)=>handelChange(e, 'nombre')}/>
              <TextField required id="standard-required" label="Apellido" onChange={(e)=>handelChange(e, 'apellido')} />
              <TextField required id="standard-required" label="Email" onChange={(e)=>handelChange(e, 'email')} />
              <TextField required id="standard-required" label="Telefono" onChange={(e)=>handelChange(e, 'telefono')} />
              <TextField
                required
                id="standard-required"
                label="Tienda"
                placeholder="Tienda de donde quieren las compras"
                onChange={(e)=>handelChange(e, 'tienda')} 
              />
              <TextField
                required
                id="standard-required"
                label="Presupuesto"
                placeholder="Presupuesto estimado para la compra"
                onChange={(e)=>handelChange(e, 'presupuesto')} 
              />
              <TextField
                id="standard-multiline-static"
                label="Nota"
                multiline
                rows={4}
                onChange={(e)=>handelChange(e, 'nota')} 
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handelSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
