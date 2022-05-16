import './App.css';
import Settings from "./components/settings/settings";
import { Routes, Route} from "react-router-dom";
import Status from "./components/settings/status/status";
import {useState} from "react";

const ENDPOINT = "ws://20.230.116.80:7000/";
const socket = new WebSocket(ENDPOINT);
function App() {

    const [electric, setElectric] = useState(0);
    const [isPower, setIsPower] = useState(true);
    const [batteryLevel, setBatteryLevel] = useState(55);

    socket.onopen = function(evt) {
        console.log("onOpen");
    }

    socket.onmessage = function(msg) {
        const object = JSON.parse(msg.data);
        if (object.type === 'electricity') {
            setElectric(parseInt(object.value.cent));
            setIsPower(Boolean(object.value.isPower));
            setBatteryLevel(parseInt(object.value.batteryLevel));
        }
    };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Settings isPower={isPower} electric={electric}/>} />
          <Route path="/info" element={<Status socket={socket} isPower={isPower} electric={electric} batteryLevel={batteryLevel}/>}/>
      </Routes>
    </div>
  );
}

export default App;
