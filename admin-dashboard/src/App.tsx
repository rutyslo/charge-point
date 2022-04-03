import React, {useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Header from "./components/header/header";
import Charging from "./components/charging/charging";
// import Map from "./components/map/map";

const ENDPOINT = "ws://iltlvmac0171.intl.att.com:7000/";
const socket = new WebSocket(ENDPOINT);

function App() {

  const [rowData, setRowData] = useState<any[]>([]);
  const [dateNow, setDateNow] = useState<string>('');

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
            <Route path="/" />
            <Route path="charging" element={<Charging rowData={rowData} dateNow={dateNow}/>} />
            <Route path="consumption" />
            <Route path="expenses" />
            {/*<Route path="map"  element={<Map rowData={rowData} dateNow={dateNow}/>} />*/}
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
