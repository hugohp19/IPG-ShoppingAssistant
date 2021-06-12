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
      <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>BUSCA LO QUE NECESITAS</h2>
          <p>
            Seleccionas los productos que necesitas en esas paginas que no
            puedes pagar o que no te deje completar la compra y nos envías el
            link de cada producto junto a su descripción (talla, color,
            cantidad).
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>ENVIA LA LISTA CON LOS PRODUCTOS</h2>
          <p>
            Envía la lista a compras@grupoipg2000.com y nosotros nos comunicamos
            contigo para mostrarte el resumen de la compra y el monto a pagar.
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
          <h2>REALIZA EL PAGO</h2>
          <p>
            Verifica que todos los productos estén correctos y procede al pago
            vía Zelle, PayPal, Apple Pay, o una transferencia directa a BOFA.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>EL FEE DE TU COMPRA</h2>
          <p>
            El costo por este servicio es el <strong>%5</strong>. No incluye
            "pick up".
          </p>
          <p>
            Recuerda revisar que tus productos estén disponibles en talla y
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
          <h2>LLEVA EL CONTROL</h2>
          <p>
            Una vez realizada da la compra debes estar atento a las fotos que te
            enviamos para ir haciendo tu check list.
          </p>
          <p>
            Cuando este todo los productos, nos dices como vamos a realizar tu
            envió.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>RECIBE TU MERCANCIA</h2>
          <p>Espera a recibir tu mercancía y disfruta.</p>
        </Info>
        <StepImage>
          <img src={step6} alt="Step 6" />
        </StepImage>
      </Card2>
    </Container>
  );
};

export default EnLinea;

const Container = styled.div`
  background-color: #7ffee0;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

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
