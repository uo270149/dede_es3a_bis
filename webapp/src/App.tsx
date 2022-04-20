import Home from './components/Home/Home';
import './App.css';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Fragments/Footer';
import { Product } from './shared/shareddtypes';
import Requests from './components/Requests/Requests'
import { useState } from 'react';
import { SessionProvider } from '@inrupt/solid-ui-react';
import FormLogIn from './components/Login/FormLogIn';
import ProfileViewer from './components/Login/ProfileViewer';

let productos= new Array<Product>();
function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  return (
    <>
    <SessionProvider sessionId="logIn">
      <Router>
      <Routes>
        <Route  path={"/"} element={<Home/>} />
        <Route  path="/Cart" element={<Cart/>}/>
        <Route  path="/Details" element={<Details/>}/>
        <Route  path="/FormLogIn" element={<FormLogIn/>}/>
        <Route  path="/ProfileViewer" element={<ProfileViewer/>}/>
        <Route  path="/Requests" element={<Requests/>}/>
        </Routes>
        <Footer/>
      </Router>
      </SessionProvider>
    </>
  );
}
export default App;