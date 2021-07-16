import React from "react";
import styled from "styled-components";
import step1 from "../assets/images/enlinea/step1.jpg";
import step2 from "../assets/images/enlinea/step2.jpg";
import step3 from "../assets/images/enlinea/step3.jpg";
import step4 from "../assets/images/enlinea/step4.jpg";
import step5 from "../assets/images/enlinea/step5.jpg";
import step6 from "../assets/images/enlinea/step6.jpg";

const EnLinea = () => {
  return (
    <Container>
            <Title>
      <p>Para hacer este tipo de compras contamos con catálogos digitales de Costco y Bjs.</p> 
      </Title>
      <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>Envía la lista con los productos</h2>
          <p>
          Envíanos el link y lista de compras a compras@grupoipg2000.com, nos comunicaremos contigo para indicarte el resumen de la compra y el monto a pagar.
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
          <h2>Control de la compra</h2>
          <p>
          Una vez realizada da la compra debes estar atento a las fotos que te enviamos para ir haciendo tu check list.
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
          <h2>Espera la mercancia y disfruta.</h2>
        </Info>
      </Card1>
    </Container>
  );
};

export default EnLinea;

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
background-color: #07746e;
  border: 1px solid #7ffee0;
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

const Card2 = styled.div`
  background-color: #51b1b8;
  border: 1px solid #7ffee0;
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
