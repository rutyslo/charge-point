import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Header from "./components/header/header";
import Charging from "./components/charging/charging";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <header className="App-header">
          <Header />
        </header>

        <div className={'App-content'}>
          <Routes>
            <Route path="/" />
            <Route path="charging" element={<Charging />} />
            <Route path="consumption" />
            <Route path="expenses" />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
