import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import swal from "sweetalert";

const UploadData = () => {
  const [previewSource, setPreviewSource] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [productData, setProductData] = useState();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const top100Films = ["Costco", "Walmart", "Hobby Lobby"];

  const useStyles = makeStyles((theme) => ({
    textField: {
      margin: theme.spacing(1),
      width: 350,
    },
    formControl: {
      margin: theme.spacing(1),
      width: 350,
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  const handleChange = (e) => {
    e.preventDefault();
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "stores");
    let imageData = {};

    await axios
      .post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      .then((response) => {
        //setFormData({ ...formData, xrayUpload: response.data.url });
        imageData = {secureUrl: response.data.secure_url, photoId: response.data.public_id};
      })
      .catch((err) => {
        console.log(err);
      });
    return imageData;
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    setImageToUpload(file);
    previewFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productData?.name ||
      !productData?.code ||
      !productData?.price ||
      !productData?.store ||
      !imageToUpload
    ) {
      swal({ text: "All fields are Required!", icon: "warning" });
      return;
    }
    try {
      const photoData = await uploadImage(imageToUpload);
      if (!photoData) return;
      const productDataToUpload = { ...productData, photo: photoData.secureUrl, photoId: photoData.photoId };
      await axios.post(`/api/products/addproduct`, productDataToUpload);
      // await axios.post(`/api/products/addproduct`, productDataToUpload)
      swal("Producto Agregado!", {
        icon: "success",
      }).then(() => {
        setProductData({});
        setPreviewSource("");
        setImageToUpload("");
      });
    } catch (err) {
      swal("Algo Salio Mal", {
        icon: "error",
      });
      console.log(err);
    }
  };

  return (
    <UploadDataContainer>
      <FormContainer>
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          variant="outlined"
          className={classes.textField}
          name="name"
          onChange={handleChange}
          value={productData?.name || ""}
        />
        <TextField
          required
          id="outlined-required"
          label="Codigo"
          variant="outlined"
          className={classes.textField}
          name="code"
          onChange={handleChange}
          value={productData?.code || ""}
        />
        <TextField
          required
          id="outlined-required"
          label="Precio"
          type="number"
          variant="outlined"
          className={classes.textField}
          name="price"
          onChange={handleChange}
          value={productData?.price || ""}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Tienda</InputLabel>
          <Select
            native
            value={productData?.store || ""}
            //onChange={handleChange}
            label="Tienda"
            inputProps={{
              name: "store",
              id: "outlined-age-native-simple",
            }}
            onChange={handleChange}
          >
            <option aria-label="None" value="" />
            <option value={"costco"}>Costco</option>
            <option value={"bj"}>Bj's</option>
            <option value={"sams"}>Sams</option>
            <option value={"refrigerados"}>Refrigerados</option>
          </Select>
        </FormControl>

        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={onChangePicture}
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
        {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            style={{ maxWidth: "50px", height: "50px" }}
          />
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar
        </Button>
      </FormContainer>
    </UploadDataContainer>
  );
};

export default UploadData;

const UploadDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.form`
  height: 500px;
  width: 500px;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: space-evenly;
  padding: 10px;
`;
