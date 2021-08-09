import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logoIPG-192x192.png';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import DropDownMenu from './DropDownMenu';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';


const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  const history = useHistory();

  const handleClick = () =>{
    history.push('/login')
  }
  return (
    <Container>
      <LogoContainer>
        <Link to='/administrador'>
          <img src={logo} alt='IPG Logo'/>
        </Link>
      </LogoContainer>
      <AvatarOrLogIn>
        {currentUser ? <DropDownMenu /> :  <Button onClick={handleClick}>Log In</Button>}
      </AvatarOrLogIn>
    </Container>
  )
}

export default Navbar;

const Container = styled.div`
  width: 100%; 
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LogoContainer = styled.div`
  padding: 0 1em;
  height: 100%;

  a{
    height: 100%;
    display: flex;
    align-items: center; 
  }

  img{
    width: 40px;
  }
`

const Button = styled.button`
  width: 70px;
  height: 30px;
  outline: none;
  cursor: pointer;
  border: none;
  background-color: #01D3C6;
  z-index: 3;
  color: #552A7C;
  font-size: 1rem;
  margin-right: 30px;
  border-radius: 5px;
`

const AvatarOrLogIn = styled.div`
  margin-right: 20px;
  z-index: 1;
`