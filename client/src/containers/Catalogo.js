import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import Banner from "../assets/images/Compracatalogo-min.png";
import { AuthContext } from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import Navbar from "../components/Navbar";
import { DockTwoTone } from "@material-ui/icons";
import axios from "axios";
import HomeIcon from '@material-ui/icons/Home';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const { userProducts, setUserProducts } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const updateState = (value) => {
    setUserProducts(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderInfo = { ...userProducts, store: "costco" };

    try {
      await axios.post(`/api/orders/addorder`, orderInfo);
      // await axios.post(`/api/orders/addorder`, orderInfo);
      swal("Orden Ingresada Exitosamente!", {
        icon: "success",
      }).then(() => {
        setUserProducts({});
        history.push("/");
      });
    } catch (err) {
      if (!currentUser) {
        swal("Debes hacer Login Primero", {
          icon: "error",
          buttons: ["Cancelar", "Log In"],
        }).then((login) => {
          if (login) {
            history.push("/login");
          }
        });
      } else {
        swal("Upps, Algo salio mal", {
          icon: "error",
        });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserProducts({
      ...userProducts,
      [e.target.name]: { product: e.target.name, quantity: e.target.value },
    });
  };

  const getProducts = async () => {
    try {
      const products = await axios({
        method: 'GET',
        // url: `${process.env.REACT_APP_API_URL}/getproducts`,
        url: `/api/getproducts`,
        withCredentials: "include",
      })
      setProductos(products.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CatalogoContainer>
      <CatalogoBanner>
        <img src={Banner} alt="Banner" />
      </CatalogoBanner>
      <Link to='/'>
        <HomeIcon style={{textAlign: 'center', width: '100%', color: '#01ACA2', fontSize: '2rem'}}/>
      </Link>
      <Products>
        {productos &&
          productos.map((producto) => {
            return (
              <ProductCard
                key={producto._id}
                data={producto}
                updateState={updateState}
                handleChange={handleChange}
                value={userProducts ? userProducts[producto._id]?.quantity : 0}
              />
            );
          })}
      </Products>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Agregar
      </Button>
    </CatalogoContainer>
  );
};

export default Catalogo;

const CatalogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;
const CatalogoBanner = styled.div`
  img {
    width: 100%;
    background-size: cover
  }
  margin: 30px;
  max-height: 200px;
  background-color: #512776;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Products = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 50px;
  margin: 30px;
`;
