import React from "react";
import styled from "styled-components";
import step1 from "../assets/images/asistida/step1.jpg";
import step2 from "../assets/images/asistida/step2.jpg";
import step3 from "../assets/images/asistida/step3.jpg";
import step4 from "../assets/images/asistida/step4.jpg";
import step5 from "../assets/images/asistida/step5.jpg";
import step6 from "../assets/images/asistida/step6.jpg";

const Asistida = () => {
  return (
    <Container>
            <Title>
      <p>Para hacer este tipo de compras contamos con catálogos digitales de Costco y Bjs.</p> <p>¡Conforma tu lista de compra!</p>
      </Title>
     <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>Ingresa a nuestro portal</h2>
          <p>
          Ingresa en el portal con tu usuario y código y llena en línea los productos que deseas comprar.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>Conforma tu pedido antes del viernes</h2>
          <p>
          Recibimos tus pedidos hasta el día viernes, tus productos se comprarán la semana siguiente de recibir la orden.
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
          <h2>Recibe el resumen del pedido y pago</h2>
          <p>
          Verifica que todos los productos del pedido estén correctos y que el monto a pagar sea el que se indica al final del pedido.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>Reporte de compra</h2>
          <p>
          El jueves o viernes luego de hacer la compra te haremos llegar un reporte con el resumen de la compra y el soporte de la factura.
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
        <h2>Datos del envío</h2>
          <p>Indícanos cómo quieres que sea tu envío y nosotros nos encargamos de toda la logística de tu carga.</p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>Espera la mercancia y disfruta</h2>
        </Info>
        <StepImage>
          <img src={step6} alt="Step 6" />
        </StepImage>
      </Card2>
    </Container>
  );
};

export default Asistida;

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
  margin: 2rem 0;
  color: #01A398;
`

const Card1 = styled.div`
  background-color: #f7b4a3;
  border: 1px solid darkgray;
  color: #666666;
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
  background-color: #a6a6a6;
  border: 1px solid lightgray;
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
