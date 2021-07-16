import React from "react";
import styled from "styled-components";
import step1 from "../assets/images/porlista/step1.jpg";
import step2 from "../assets/images/porlista/step2.jpg";
import step3 from "../assets/images/porlista/step3.jpg";
import step4 from "../assets/images/porlista/step4.jpg";
import step5 from "../assets/images/porlista/step5.jpg";
import step6 from "../assets/images/porlista/step6.jpg";

const PorLista = () => {
  return (
    <Container>
      <Title>
      <p>Esta modalidad funciona para compras en Walmart o Dollar Tree. Si sabes en detalle los productos que quieres comprar pero no están en internet esta es tu opción.</p>
      </Title>
      <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>Formato de lista</h2>
          <p>
          Solicítanos el formato de lista, llénalo y énvialo a compras@grupoigg2000.com
          </p>
          <p>
          Si son productos muy específicos recuerda siempre enviarnos una foto para nuestra referencia.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>Realiza tu pago</h2>
          <p>
          Verifica que todos los productos estén correctos y procede al pago vía Zelle, PayPal, Apple Pay, o una transferencia directa a BOFA.
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
          <h2>Reporte de compra</h2>
          <p>
          El jueves o viernes luego de hacer la compra te haremos llegar un reporte con el resumen de la compra y el soporte de la factura.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>Datos del envío</h2>
          <p>
          Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga.
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
          <h2>Espera la mercancia y disfruta</h2>
        </Info>
      </Card1>
    </Container>
  );
};

export default PorLista;

const Container = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title= styled.h3`
  text-align: center;
  width: 70%;
  margin: 2rem;
  color: #01A398;
`

const Card1 = styled.div`
  background-color: #04413e;
  border: 1px solid green;
  color: #c9e368;
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
  background-color: #c9e368;
  border: 1px solid green;
  color: #04413e;
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
