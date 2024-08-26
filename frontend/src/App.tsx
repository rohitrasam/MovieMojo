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

}

export default App;