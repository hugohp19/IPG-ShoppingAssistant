import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Options from "../components/Options";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <Container>
        <Content>
          <Hero />
          <Options />
        </Content>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;
