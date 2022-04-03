import GridTable from "../grid-table/grid-table";
import './charging.scss';
import {chargingGridOptions} from "./charging-grid-config";
import {ReactComponent as Connected} from "../../assets/connected.svg";
import {ReactComponent as Lightning} from "../../assets/charging.svg";
import {ReactComponent as Waiting} from "../../assets/waiting.svg";
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";

const Charging = (props: any) => {

  const rowData: any[] = props.rowData ;
  const dateNow: string = props.dateNow ;

  return (
    <>
      <div className={'charging-queue-wrapper'}>
        <div className={'widgets'}>
          <ChargingPoints />
          <HourlyConsumption />
        </div>
        <div className={'table-wrapper'}>
        <div className={'charging-queue-summary'}>
          <div className={'box'}>
            CP Status
            <span><Connected/>Connected: <b>{rowData.length}</b></span>
            <span><Lightning/>Charging: <b>{rowData.filter(item => item.status === 1).length}</b></span>
            <span><Waiting/>Waiting: <b>{rowData.filter(item => item.status !== 1).length}</b></span>
          </div>
          <div className={'box'}>
            {dateNow}
          </div>
        </div>
        <GridTable config={chargingGridOptions} rowData={rowData} />
        </div>
      </div>
    </>
  );
}

export default Charging;
