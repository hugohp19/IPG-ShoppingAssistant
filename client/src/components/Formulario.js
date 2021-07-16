import React from "react";
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
              <TextField required id="standard-required" label="Nombre" />
              <TextField required id="standard-required" label="Apellido" />
              <TextField required id="standard-required" label="Email" />
              <TextField required id="standard-required" label="Telefono" />
              <TextField
                required
                id="standard-required"
                label="Tienda"
                placeholder="Tienda de donde quieren las compras"
              />
              <TextField
                required
                id="standard-required"
                label="Presupuesto"
                placeholder="Presupuesto estimado para la compra"
              />
              <TextField
                id="standard-multiline-static"
                label="Nota"
                multiline
                rows={4}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
