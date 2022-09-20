import { BrowserRouter, Redirect, Route ,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './component/Navbar';
import TopAnimePage from './pages/TopAnimePage';
import SingleAnimePage from './pages/SingleAnimePage';
import SeasonnalAnimePage from './pages/SeasonalAnimePage';
import AnimeMapPage from './pages/AnimeMapPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SingleStudioPage from './pages/SingleStudioPage';
import React, { useState, useEffect } from "react";
import './App.scss'
function App() {
  const AuthApp=()=>{
    return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/topanime" element={<TopAnimePage/>}/>
        <Route path="/anime/:id" element={<SingleAnimePage/>}/>
        <Route path="/studio/:id" element={<SingleStudioPage/>}/>
        <Route path="/allanime" element={<SeasonnalAnimePage/>}/>
        <Route path="/mymap" element={<AnimeMapPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
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
