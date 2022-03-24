import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/home";
import {ReactComponent as Logo} from './../src/assets/images/logo-con.svg';

function App() {

  return (
      <div className="App">
          <Logo className={"logo-icon"} width={190} height={37}/>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
  );
}

export default App;
