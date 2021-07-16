import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/Logoipg.png';
import Banner from '../assets/images/Banner-min.png';

const Hero = () => {
  return (
    <Container>
      <Content>
        <Slogan>
          <h2>¡Hacemos de tus compras un proceso cómodo y fácil!</h2>
          <p>Somos tu asistente de compras de confianza, cuéntanos qué productos quieres y nosotros nos encargamos de todo el proceso, para que te llegue a Venezuela.</p>
        </Slogan>
      </Content>
    </Container>
  )
}

export default Hero;

const Container = styled.div`
  height: 60vh;
  width: 100%;
  padding: 20px;
  z-index: -10;
  margin-top: 10px;
  background-image: url(${Banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  `

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

`
const ImageContainer = styled.div`
  img{
    width: 300px;
  }
`

const Slogan = styled.div`
  min-width: 300px;
  background-color: rgba(255,255,255, 70%);
  padding: 2rem;

  h2{
    // color: #01D3C6;
    font-size: 2rem;
    font-weight: 700;
    max-width: 600px;
  }

  p{
    color: #01A398;
    font-size: 1.2rem;
    max-width: 700px;
    font-weight: 500;
    
    @media only screen and (max-width: 450px){
      color: black;
    }
  }
`