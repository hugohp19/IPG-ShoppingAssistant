import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { stepsByType } from "../assets/stepsByType";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Formulario from "./Formulario";

const TypeOfShop = (props) => {
  const { type } = props;
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ShopLogo>
        <img src={stepsByType[type].image} alt="Logo" />
      </ShopLogo>
      <RightContainer>
        <Steps>
          <h3>{stepsByType[type].title}</h3>
          <p>{stepsByType[type].heading}</p>

          {stepsByType &&
            stepsByType[type].steps.map((data) => {
              return (
                <Tooltip title={data.description} arrow placement="right">
                  <Button>{`${data.step} ${data.text}`}</Button>
                </Tooltip>
              );
            })}
        </Steps>
        <BtnContainer>
          {type === 'catalogo' ? <Button
            variant="contained"
            style={{
              backgroundColor: "#CA6AE3",
              margin: "20px 0",
              textDecoration: "none",
              color: 'white',
            }}
            onClick={(e)=>{history.push('/catalogo')}}
          >
            <ShoppingCartIcon />
            Comprar
          </Button>
          :
          <Button
            variant="contained"
            style={{
              backgroundColor: "#CA6AE3",
              margin: "20px 0",
              textDecoration: "none",
              color: 'white',
            }}
            onClick={handleClickOpen}
          >
            <ShoppingCartIcon />
            Formulario
          </Button>}
          <Formulario open={open} handleClose={handleClose}/>
        </BtnContainer>
      </RightContainer>
    </Container>
  );
};

export default TypeOfShop;

const Container = styled.div`
  height: 100%;
  display: flex;
  // border: 2px solid #51b1b8;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ShopLogo = styled.div`
  height: 100%;
  border-right: 1px solid #f0f4ff;

  img {
    height: 100%;
  }
`;

const Steps = styled.div`
  padding: 2rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    color: #51b1b8;
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
    margin-bottom: 1em;
  }

  h4 {
    font-size: 0.9rem;
    margin-top: 0.8rem;
  }
  p {
    font-size: 0.8rem;
    margin-bottom: 1em;
  }
`;
