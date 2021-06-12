import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext()

export function AppContextProvider({children}){
  const user =  JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(null);
  const [ userProducts, setUserProducts] = useState([])

  useEffect(() => {
    console.log('user Auth: ', user)
    console.log('currentUser Auth: ', currentUser)
    let some;
    if (user && !currentUser) {
      // .get(`${process.env.REACT_APP_API_URL}/users/me`, {
      axios
        .get(`/api/users/me`, {
          withCredentials: true
        })
        .then(({ data }) => {
          console.log(data)
          some = data
          setCurrentUser(()=> data);
        })
        .catch((error) => {
          console.log(error)
        
       //swal(`Oops!`, error.toString());
      });
      console.log('after: ', some)
    }else{
      console.log('auth else')
    }
  }, [currentUser, user]);

  const value = {
    currentUser,
    setCurrentUser,
    userProducts,
    setUserProducts,
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}