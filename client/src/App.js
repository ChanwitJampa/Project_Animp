import { BrowserRouter, Redirect, Route ,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './component/Navbar';
import React, { useState, useEffect } from "react";
function App() {
  const AuthApp=()=>{
    return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
    </Routes>
    )
  }
  return (
    <div>
      <Navbar/>
      <AuthApp/>
    </div>
  );
}

export default App;
