<<<<<<< HEAD
import React from "react";
import Login from "./components/UserLogin/Login";
import Forgotpass from "./components/UserLogin/Forgotpass";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
    return(
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="forgotpass" element={<Forgotpass />} />        
      </Routes>
    </BrowserRouter>
    </>
   );

=======
import Home from './components/Home';

function App() {
    return (
        <>
            <Home />
        </>
    );
>>>>>>> da7a21bba5192d3588414580b0eb8e1a03de1dac
}

export default App;