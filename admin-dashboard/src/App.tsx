import React, {useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Header from "./components/header/header";
import Charging from "./components/charging/charging";
import Map from "./components/map/map";
import Home from "./components/home/home";

export const BE_URL = 'http://localhost:4000';

const ENDPOINT = "ws://localhost:7000/";
const socket = new WebSocket(ENDPOINT);

function App() {

  const [rowData, setRowData] = useState<any[]>([]);
  const [dateNow, setDateNow] = useState<string>('');
  const [newIndex, setNewIndex] = useState<number>(0);
  const [removeIndex, setRemoveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  socket.onopen = function(evt) {
    console.log("onopen");
  }
  socket.onmessage = function(msg) {
    console.log("RECEIVE");
    const message = JSON.parse(msg.data);
    if (message.type === 'logTermParking') {
      setRowData(message.value.cpList);
      setDateNow(message.value.dateNow);
      setNewIndex(message.value.newIndex);
      setRemoveIndex(message.value.removeIndex)
      setCurrentIndex(message.value.currentIndex)
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <header className="App-header">
          <Header />
        </header>

        <div className={'App-content'}>
          <Routes>
            <Route path="/" element={<Home rowData={rowData} />}/>
            <Route path="charging" element={<Charging rowData={rowData} dateNow={dateNow} currentIndex={currentIndex}/>} />
            <Route path="consumption" />
            <Route path="expenses" />
            <Route path="map" element={<Map rowData={rowData} dateNow={dateNow} newIndex={newIndex}
                 currentIndex={currentIndex} removeIndex={removeIndex}/>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
