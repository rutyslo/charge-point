import './App.css';
import Settings from "./components/settings/settings";
import { Routes, Route} from "react-router-dom";
import Status from "./components/settings/status/status";
import {useState} from "react";

const ENDPOINT = "ws://iltlvmac0171.intl.att.com:7000/";
const socket = new WebSocket(ENDPOINT);
function App() {

    const [electric, setElectric] = useState(0);
    const [isPower, setIsPower] = useState(true);

    socket.onopen = function(evt) {
        console.log("onOpen");
    }

    socket.onmessage = function(msg) {
        console.log("RECEIVE");
        const object = JSON.parse(msg.data);
        if (object.type === 'electricity') {
            setElectric(parseInt(object.value.cent));
            setIsPower(Boolean(object.value.isPower));
        }
    };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Settings isPower={isPower} electric={electric}/>} />
          <Route path="/info" element={<Status socket={socket} isPower={isPower} electric={electric}/>} />
      </Routes>
    </div>
  );
}

export default App;
