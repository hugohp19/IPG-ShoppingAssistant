import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/Logoipg.png';

const Hero = () => {
  return (
    <Container>
      <Content>
        <ImageContainer>
          <img src={Logo} alt='IPG Logo'/>
        </ImageContainer>
        <Slogan>
          <h2>Tus compras de manera facil y directo a Venezuela</h2>
          <p>Solo dinos los productos que deseas de una de nuestras tiendas aliadas, y nosotro hacemos el resto... y lo ponemos en Venezuela</p>
        </Slogan>
      </Content>
    </Container>
  )
}

export default Hero;


const Container = styled.div`
  background-image: linear-gradient(45deg, #D7BBF0, #552A7C);
  transform: skewY(-6deg);
  height: 70vh;
  width: 100%;
  padding: 20px;
  z-index: -10;
  `

const Content = styled.div`
  transform: skewY(6deg);
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

  h2{
    color: #01D3C6;
    font-size: 2rem;
    font-weight: 700;
    max-width: 600px;
  }

  p{
    color: white;
    max-width: 400px;
    font-weight: 500;
    
    @media only screen and (max-width: 450px){
      color: black;
    }
  }
`