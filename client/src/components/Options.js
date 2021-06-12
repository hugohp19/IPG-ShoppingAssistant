import React, { useState} from 'react'
import styled from 'styled-components';
import Catalogo from './Catalogo';
import PorLista from './PorLista';
import EnLinea from './EnLinea';
import Asistida from './Asistida';

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
        <p>Una persona realizara compras en EE.UU para ti! En IPG ofrecemos diferentes opciones para hacer las compras, según tipo de producto, tienda y forma de hacer la compra.</p>
      </Intro>
      <OptionsContainer>
        <OptionsButtons>
          <button id='catalogo' className={activeBtn === 'catalogo' ? 'selected' : ''} onClick={(e)=>{handleOpciones(e, 'catalogo')}}>Por Cátalogo</button>
          <button id='lista' className={activeBtn === 'lista' ? 'selected' : ''} onClick={(e)=>{handleOpciones(e, 'lista')}}>Por Lista</button>
          <button id='asistida' className={activeBtn === 'asistida' ? 'selected' : ''} onClick={(e)=>{handleOpciones(e, 'asistida')}}>Asistida</button>
          <button id='linea' className={activeBtn === 'linea' ? 'selected' : ''} onClick={(e)=>{handleOpciones(e, 'linea')}}>En Línea</button>
        </OptionsButtons>
        <OptionsInfoContainer>
          {opcion}
        </OptionsInfoContainer>
      </OptionsContainer>
    </Container>
  )
}

export default Options;

const Container = styled.div`
  margin-top: 80px; 
  z-index: 10;
  width: 100%;
`

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    color: #01A398;
    font-size: 2rem;
    font-weight: 800;
  }
  p{
    margin: 10px 30px;
    font-size: 1.5rem;
    font-weight: 500;
  }
`

const OptionsContainer = styled.div`
  margin-top: 50px;
  width: 100%;
`

const OptionsButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
    
  button{
    outline: none;
    width: 150px;
    height: 40px;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    -webkit-box-shadow: 0px 21px 18px -18px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 21px 18px -18px rgba(0,0,0,0.75);
    box-shadow: 0px 21px 18px -18px rgba(0,0,0,0.75);
    cursor: pointer;
  }

  #catalogo{
    background-color: #F5C0E1;
    color: #502776;
  }

  #lista{
    background-color: #499d67;
    color: #C9E368;
  }

  #asistida{
    background-color: lightgray;
  }

  #linea{
    background-color: #7FFEE0;
    color: #07746E;
  }

  .selected{
    box-shadow: none;
    border-radius: 5px 5px 0 0;
  }

  @media only screen and (max-width: 450px) {
    justify-content: space-evenly;
    flex-wrap: nowrap;
  }

`


const OptionsInfoContainer = styled.div`
  margin-top: -5px;
`