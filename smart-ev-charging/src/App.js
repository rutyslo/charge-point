import './App.css';
import Settings from "./components/settings/settings";
import { Routes, Route} from "react-router-dom";
import Status from "./components/settings/status/status";
import {useState} from "react";

const ENDPOINT = "ws://localhost:7000/";
const socket = new WebSocket(ENDPOINT);
function App() {

    const [electric, setElectric] = useState(0);
    const [isPower, setIsPower] = useState(true);

    socket.onopen = function(evt) {
        // const bn_req = JSON.stringify([2, "wwwwww", "BootNotification", {}]);
        // socket.send(bn_req);
        console.log("onopen");
    }
    socket.onmessage = function(msg) {
        console.log("RECEIVE: " + msg.data);
        const object = JSON.parse(msg.data);
        setElectric(parseInt(object.cent));
        setIsPower(Boolean(object.isPower));
    };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Settings/>} />
          <Route path="/info" element={<Status isPower={isPower} electric={electric}/>} />
      </Routes>
    </div>
  );
}

export default App;
