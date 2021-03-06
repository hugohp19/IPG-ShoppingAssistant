import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Navbar from "./components/Navbar";
import Formulario from "./components/Formulario";
import Catalogo from "./containers/Catalogo";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import { AppContextProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import UpdateProfile from './components/UpdateProfile';
import UploadData from './components/secure/UploadData';
import Dashboard from './containers/Dashboard';
import AuthenticatedRoute from './components/AuthenticatedRoutes';
import RequestPassword from './components/Password/RequestPassword'
import UpdatePassword from './components/Password/UpdatePassword'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/catalogo" component={Catalogo} />
          <Route exact path="/formulario" component={Formulario} />
          <Route exact path="/update-profile" component={UpdateProfile} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <Route exact path="/requestpassword" component={RequestPassword} />
          <AuthenticatedRoute exact path="/administrador" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
