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
      <Card1>
        <StepImage>
          <img src={step1} alt="Step 1" />
        </StepImage>
        <Info>
          <h2>ESTA MODALIDAD FUNCIONA PARA "WALMART" O "DOLLAR TREE"</h2>
          <p>
            Es para productos que ya sabes cuales son y tienes el detalle, pero
            no se pueden comprar por internet. También funciona para otras
            tiendas pero Walmart y Dollar Tree son las mas comunes.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>ENVIA LA LISTA CON LOS PRODUCTOS</h2>
          <p>
            Pídenos el formato de lista, llénala y envíala a
            compras@grupoipg2000.com. Recomendamos enviar fotos si son productos
            muy específicos.
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
          <h2>REALIZA TU PAGO</h2>
          <p>
            Verifica que todos los productos estén correctos y procede al pago
            vía Zelle, PayPal, Apple Pay, o una transferencia directa a BOFA.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>EL FEE DE TUS COMPRAS</h2>
          <p>
            El costo por este servicio es el 13%. El fee mínimo es de $13 para
            compras menores de $100.
          </p>
          <p>
            En caso de que tu producto no se encuentre disponible, nos puedes
            autorizar para remplazarlo por uno similar en calidad y precio.
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
          <h2>TE PASAMOS EL REPORTE</h2>
          <p>
            Entre Jueves y viernes, después de hacer la compra, te hacemos
            llegar un reporte con lo comprado y las facturas de soporte.
          </p>
        </Info>
      </Card1>
      <Card2>
        <Info>
          <h2>LISTO PARA EL ENVIO</h2>
          <p>
            Déjanos saber como quieres tu envio. Espera tu compra y disfruta.
          </p>
        </Info>
        <StepImage>
          <img src={step6} alt="Step 6" />
        </StepImage>
      </Card2>
    </Container>
  );
};

export default PorLista;

const Container = styled.div`
  background-color: #499d67;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

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
