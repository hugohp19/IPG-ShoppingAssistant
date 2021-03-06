import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext()

export function AppContextProvider({children}){
  const user =  JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(null);
  const [ userProducts, setUserProducts] = useState([])

  useEffect(() => {
    let some;
    if (user && !currentUser) {
      axios.get(`/api/users/me`, {
      // axios.get(`/api/users/me`, {
          withCredentials: true
        })
        .then(({ data }) => {
          some = data
          setCurrentUser(()=> data);
        })
        .catch((error) => {
          console.log(error)
        
       //swal(`Oops!`, error.toString());
      });
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