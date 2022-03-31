import GridTable from "../grid-table/grid-table";
import './charging.scss';
import {useEffect, useState} from "react";
import {chargingGridOptions} from "./charging-grid-config";
import data from './charging-queue.json';
import {ReactComponent as Connected} from "../../assets/connected.svg";
import {ReactComponent as Lightning} from "../../assets/charging.svg";
import {ReactComponent as Waiting} from "../../assets/waiting.svg";
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";

const ENDPOINT = "ws://iltlvmac0175.intl.att.com:7000/";
const socket = new WebSocket(ENDPOINT);

const Charging = () => {

  const [rowData, setRowData] = useState<any[]>([]);
  const [dateNow, setDateNow] = useState<string>('');

  useEffect(() => {
    setRowData(data);
  }, []);

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
    <>
      <div className={'charging-queue-wrapper'}>
        <div className={'widgets'}>
          <ChargingPoints />
          <HourlyConsumption />
        </div>
        <div className={'charging-queue-summary'}>
          <div className={'box'}>
            Charging Queue
            <span><Connected/>Now: <b>{rowData.length}</b></span>
            <span><Lightning/>Charging: <b>{rowData.filter(item => item.status === 1).length}</b></span>
            <span><Waiting/>Waiting: <b>{rowData.filter(item => item.status === 0).length}</b></span>
          </div>
          <div className={'box'}>
            {dateNow}
          </div>
        </div>
        <GridTable config={chargingGridOptions} rowData={rowData} />
      </div>
    </>
  );
}

export default Charging;
