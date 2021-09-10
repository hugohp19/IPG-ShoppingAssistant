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
import swal from "sweetalert";
import axios from "axios";

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

export default function FormularioEdit({ open, handleClose, data }) {
  const classes = useStylesSecondary();
  console.log(data);
  const [userInfo, setUserInfo] = useState({});
  const [userError, setUserError] = useState({});

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handelChange = (e, type) => {
    if (type === "price") {
      setUserInfo({
        ...userInfo,
        [type]: parseFloat(e.target.value),
        id: data._id,
      });
    } else {
      setUserInfo({ ...userInfo, [type]: e.target.value, id: data._id });
    }
  };

  const handelSubmit = (e, type) => {
    try {
      if (data.name === userInfo.name) delete userInfo.name;
      if (data.code === userInfo.code) delete userInfo.code;
      if (data.price === userInfo.price) delete userInfo.price;
      if (data.store === userInfo.store) delete userInfo.store;
      if (data.photo === userInfo.photo) delete userInfo.photo;
      if (
        !userInfo.name &&
        !userInfo.code &&
        !userInfo.price &&
        !userInfo.store &&
        !userInfo.photo
      ) {
        console.log("info missing");
        return;
      }

      console.log(userInfo);
      axios.put('/api/products/updateproduct', userInfo);
      swal("Producto Actualizado Exitosamente!", {
        icon: "success",
      }).then(() => {
        setUserInfo({});
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////////
  /////////////////////////////////
  // ver como se hace refetch para que pueda actualizarce la tabla
  // limpiar el codigo
  // compiar lo de actualizar la foto para este componente
  /////////////////////////////////
  /////////////////////////////////

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <ContactMailIcon />
        </DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} noValidate autoComplete="off">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                required
                id="standard-required"
                label="Nombre"
                defaultValue={data.name}
                onChange={(e) => handelChange(e, "name")}
              />
              <TextField
                required
                id="standard-required"
                label="Codigo"
                defaultValue={data.code}
                onChange={(e) => handelChange(e, "code")}
              />
              <TextField
                required
                id="standard-required"
                label="Price"
                type="number"
                defaultValue={data.price}
                onChange={(e) => handelChange(e, "price")}
              />
              <TextField
                required
                id="standard-required"
                label="Store"
                defaultValue={data.store}
                onChange={(e) => handelChange(e, "store")}
              />
              <TextField
                required
                id="standard-required"
                label="Photo"
                defaultValue={data.photo}
                onChange={(e) => handelChange(e, "photo")}
              />
              <img
                src={data.photo}
                alt="Product Pic"
                style={{ maxWidth: "100px" }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handelSubmit} color="primary">
            Guardar
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
