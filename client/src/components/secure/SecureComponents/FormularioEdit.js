import React, { useState, useEffect } from "react";
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
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function FormularioEdit({ open, handleClose, data }) {
  const classes = useStylesSecondary();
  const [userInfo, setUserInfo] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState();
  const [photoUrl, setPhotoUrl] = useState();

  const handleChange = (e, type) => {
    if (type === "price") {
      setUserInfo({
        ...userInfo,
        [type]: parseFloat(e.target.value),
      });
    } else {
      setUserInfo({ ...userInfo, [type]: e.target.value });
    }
  };

  const handelSubmit = (e, type) => {
    let dataToUpdate = {};
    try {
      if (data.name === userInfo.name) delete userInfo.name;
      if (data.code === userInfo.code) delete userInfo.code;
      if (data.price === userInfo.price) delete userInfo.price;
      if (data.store === userInfo.store) delete userInfo.store;
      if (data.photo === userInfo.photo) delete userInfo.photo;
      if (data.photoId) delete userInfo.photoId;
      if (
        !userInfo.name &&
        !userInfo.code &&
        !userInfo.price &&
        !userInfo.store &&
        !userInfo.photo &&
        !userInfo.photoId &&
        !previewPhoto
      ) {
        console.log("info missing");
        return;
      }

      if (previewPhoto) {
        dataToUpdate = { ...userInfo, photo: previewPhoto, id: data._id };
      } else {
        dataToUpdate = { ...userInfo, id: data._id };
      }

      axios.put("/api/products/updateproduct", dataToUpdate);
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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewPhoto(reader.result);
    };
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  function getPhotoId(url) {
    const index = url.indexOf("stores");
    const endIndex = url.indexOf(".jpg");
    const newString = url.slice(index, endIndex);
    setPhotoUrl(newString);
  }

  useEffect(() => {
    if (data.photo) getPhotoId(data.photo);
  }, [data]);

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
                onChange={(e) => handleChange(e, "name")}
              />
              <TextField
                required
                id="standard-required"
                label="Codigo"
                defaultValue={data.code}
                onChange={(e) => handleChange(e, "code")}
              />
              <TextField
                required
                id="standard-required"
                label="Price"
                type="number"
                defaultValue={data.price}
                onChange={(e) => handleChange(e, "price")}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tienda</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userInfo.store || data.store}
                  onChange={(e) => handleChange(e, "store")}
                >
                  <MenuItem value={"costco"}>Costco</MenuItem>
                  <MenuItem value={"bj"}>Bj's</MenuItem>
                  <MenuItem value={"sams"}>Sams</MenuItem>
                  <MenuItem value={"refrigerados"}>Refrigerados</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                id="standard-required"
                label="Photo"
                defaultValue={data.photo}
              />
              <TextField
                required
                id="standard-required"
                label="PhotoId"
                defaultValue={data.photoId || ""}
                onChange={(e) => handleChange(e, "photoId")}
              />
              <p style={{ fontSize: "10px" }}>{photoUrl}</p>
              <img
                src={data.photo}
                alt="Product Pic"
                style={{ maxWidth: "100px" }}
              />
            </div>

            <div className={classes.root}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleImageSelect}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            {previewPhoto && (
              <img
                src={previewPhoto}
                alt="chosen"
                style={{ maxWidth: "100px" }}
              />
            )}
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
