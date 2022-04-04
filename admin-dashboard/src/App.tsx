import React, {useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Header from "./components/header/header";
import Charging from "./components/charging/charging";
import Map from "./components/map/map";
import Home from "./components/home/home";

const ENDPOINT = "ws://iltlvmac0171.intl.att.com:7000/";
const socket = new WebSocket(ENDPOINT);

function App() {

  const [rowData, setRowData] = useState<any[]>([]);
  const [dateNow, setDateNow] = useState<string>('');
  const [newIndex, setNewIndex] = useState<number>(0);
  const [removeIndex, setRemoveIndex] = useState<number>(0);

  socket.onopen = function(evt) {
    console.log("onopen");
  }
  socket.onmessage = function(msg) {
    console.log("RECEIVE: " + msg.data);
    const message = JSON.parse(msg.data);
    if (message.type === 'logTermParking') {
      console.log(message.value)
      setRowData(message.value.cpList);
      setDateNow(message.value.dateNow);
      setNewIndex(message.value.newIndex);
      setRemoveIndex(message.value.removeIndex)
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
            <Route path="/" element={<Home rowData={rowData} />} />
            <Route path="charging" element={<Charging rowData={rowData} dateNow={dateNow} />} />
            <Route path="consumption" />
            <Route path="expenses" />
            <Route path="map" element={<Map rowData={rowData} dateNow={dateNow} newIndex={newIndex} removeIndex={removeIndex}/>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
