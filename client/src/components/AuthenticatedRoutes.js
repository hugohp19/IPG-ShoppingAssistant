import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthenticatedRoute({component: Component, ...rest}){
  const user = JSON.parse(localStorage.getItem('user'))
  
  return(
    <Route
      {...rest}
      render = { routeProps => 
        user && user.admin ?    
        (<Component {...routeProps}/>)
        :
        (<Redirect to='/' />) 
      } 
    />
  )
}

export default AuthenticatedRoute;