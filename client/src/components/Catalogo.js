import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import step1 from "../assets/images/catalogo/step1.jpg";
import step2 from "../assets/images/catalogo/step2.jpg";
import step3 from "../assets/images/catalogo/step3.jpg";
import step4 from "../assets/images/catalogo/step4.jpg";
import step5 from "../assets/images/catalogo/step5.jpg";
import step6 from "../assets/images/catalogo/step6.jpg";

const Catalogo = () => {
  return (
    <Container>
      <Link to="/catalogo">
        <Button
          variant="contained"
          style={{ backgroundColor: "#CA6AE3", marginTop: "40px" }}
        >
          <ShoppingCartIcon />
          Comprar
        </Button>
      </Link>
      <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>INGRESA AL PORTAL</h2>
          <p>
            Contamos con catálogos digitales de Costco y Bjs (con productos
            refrigerados). Llénalos en línea con los productos que deseas
            comprar.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>ENVIA TU PEDIDO A MAS TARDAR EL VIERNES</h2>
          <p>
            Recibimos pedidos hasta los días viernes, para ser comprados la
            semana siguiente.
          </p>
        </Info>
        <StepImage>
          <img src={step2} alt="Step 2" />
        </StepImage>
      </Card2>
      <Card1>
        <StepImage>
          <img src={step3} alt="Step 3" />
        </StepImage>
        <Info>
          <h2>RECIBE EL RESUMEN DE PERDIDO Y PAGO</h2>
          <p>
            Verifica que estén todos los productos que solicitaste y el monto a
            pagar que se indica al final del pedido.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>EL FEE DE TU COMPRA</h2>
          <p>
            El costo por este servicio es el <strong>10%</strong>, también entra
            en este rubro las compras que realices de nuestro status depositando
            el monto en el mismo momento de hacer el pedido.
          </p>
          <p>
            Recuerda chequear que tus productos estén disponibles en talla y
            color deseado.
          </p>
        </Info>
        <StepImage>
          <img src={step4} alt="Step 4" />
        </StepImage>
      </Card2>
      <Card1>
        <StepImage>
          <img src={step5} alt="Step 5" />
        </StepImage>
        <Info>
          <h2>REPORTE DE TU COMPRA</h2>
          <p>
            Entre Jueves y viernes, después de hacer la compra, te hacemos
            llegar un reporte con lo comprado y las facturas de soporte.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>INDICA COMO QUIERES TU ENVIO</h2>
          <p>Espera la mercancía y disfruta.</p>
        </Info>
        <StepImage>
          <img src={step6} alt="Step 6" />
        </StepImage>
      </Card2>
      <Link to="/catalogo">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#CA6AE3",
            margin: "20px 0",
            textDecoration: "none",
          }}
        >
          <ShoppingCartIcon />
          Comprar
        </Button>
      </Link>
    </Container>
  );
};

export default Catalogo;

const Container = styled.div`
  background-color: #f5c0e1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Card1 = styled.div`
  background-color: #d9b4d6;
  border: 1px solid purple;
  color: #502776;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  @media only screen and (min-width: 810px) {
    width: 800px;
  }
`;

const Card2 = styled.div`
  background-color: #502776;
  border: 1px solid purple;
  color: white;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  @media only screen and (min-width: 810px) {
    width: 800px;
  }
`;

const StepImage = styled.div`
  flex-basis: 30%;
  margin: 0;
  padding: 0;
  height: 100%;
  img {
    border-radius: 10px 0 0 10px;
    max-width: 250px;
    max-height: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;
  flex-basis: 60%;

  p {
    width: 100%;
  }
`;
