import React, { useState} from 'react'
import styled from 'styled-components';
import Catalogo from './Catalogo';
import PorLista from './PorLista';
import EnLinea from './EnLinea';
import Asistida from './Asistida';

import CatalogoLogo from '../assets/images/Compracatálogo-min.png';
import AsistidaLogo from '../assets/images/Compraasistida-min.png';
import LineaLogo from '../assets/images/Compraenlínea-min.png';
import ListaLogo from '../assets/images/Compralista-min.png';

import TypeOfShop from './TypeOfShop';

const Options = () => {
  const [opcion, setOpcion] = useState(<Catalogo />);
  const [activeBtn, setActiveBtn] = useState('catalogo');

  const handleOpciones = (e, opcion) =>{
    e.preventDefault();
    setOpcion(opcionesComponent(opcion));
    setActiveBtn(opcion);
  }

  const opcionesComponent = (opcion) =>{
    switch(opcion){
      case 'catalogo':
        return <Catalogo />
      case 'lista':
        return <PorLista />
      case 'linea':
        return <EnLinea />
      case 'asistida':
        return <Asistida />
      default:
        return <Catalogo />
    }
  }

  return (
    <Container>
      <Intro>
        <h3>¿Como Funciona?</h3>
        <p>Funcionamos como un asistente de compras personalizado en Estados Unidos. En IPG Shopping te ofrecemos diferentes formatos de compras que se adaptan a tus necesidades, solo tienes que confirmarnos el producto y la tienda que quieres y nosotros nos encargamos del resto.</p>
        <p>Descubre las modalidades de compra y los pasos a seguir</p>
      </Intro>
      <OptionsContainer>
        <OptionsButtons>
          <button id='catalogo' className={activeBtn === 'catalogo' ? 'catalogo selected' : 'catalogo'} onClick={(e)=>{handleOpciones(e, 'catalogo')}}>Por Cátalogo</button>
          <button id='lista' className={activeBtn === 'lista' ? ' lista selected' : 'lista'} onClick={(e)=>{handleOpciones(e, 'lista')}}>Por Lista</button>
          <button id='asistida' className={activeBtn === 'asistida' ? 'asistida selected' : 'asistida'} onClick={(e)=>{handleOpciones(e, 'asistida')}}>Asistida</button>
          <button id='linea' className={activeBtn === 'linea' ? 'linea selected' : 'linea'} onClick={(e)=>{handleOpciones(e, 'linea')}}>En Línea</button>
        </OptionsButtons>
        <OptionsInfoContainer>
          <TypeOfShop type={activeBtn}/>
        </OptionsInfoContainer>
      </OptionsContainer>
    </Container>
  )
}

export default Options;

const Container = styled.div`
  margin-top: 80px; 
  margin-bottom: 80px; 
  z-index: 10;
  width: 100%;
`

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;

  h3{
    color: #01A398;
    font-size: 2rem;
    font-weight: 800;
  }
  p{
    margin: 10px 30px;
    font-size: 1.2rem;
    font-weight: 500;
    width: 100%;
    text-align: justify;
  }

  @media only screen and (max-width: 800px) {
    width: 90%;
  }
`

const OptionsContainer = styled.div`
  margin: 3em;
  display: flex;
  height: 500px;
  // background-color: red;
  border: 2px solid #51b1b8;
`

const OptionsButtons = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  // gap: 1rem;
  // padding: 0 10px;
    
  button{
    height: 100%;
    font-size: 2rem;
    border: 1px solid #51B1B8;
    cursor: pointer;

    &:hover{
      color: #51B1B8;
    }
  }

  .catalogo{
    font-weight: 600;
    background-image: url(${CatalogoLogo});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
  }

  .lista{
    font-weight: 600;
    background-image: url(${ListaLogo});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
  }

  .linea{
    font-weight: 600;
    background-image: url(${LineaLogo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }

  .asistida{
    font-weight: 600;
    background-image: url(${AsistidaLogo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    opacity: 0.5;
  }

  .selected{
    border: 2px solid #51B1B8;
    opacity: 1;
    text-shadow: 0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1),0px 18px 23px rgba(0,0,0,0.1);
    
  }

  @media only screen and (max-width: 450px) {
    justify-content: space-evenly;
    flex-wrap: nowrap;
    gap: 0;

    .btn{
      border: 1px solid #ffff;
    }
  }

`


const OptionsInfoContainer = styled.div`
  width: 80%;
`