import GridTable from "../grid-table/grid-table";
import './charging.scss';
import {getChargingGridOptions} from "./charging-grid-config";
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";
import ElectricityBuyRates from "../widgets/electricity-buy-rates/electricity-buy-rates";
import ConnectedCarsContent from "../widgets/connected-cars/connected-cars-content";
import {useState} from "react";
import Modal from "../modal/modal";

const Charging = (props: any) => {

  const rowData: any[] = props.rowData ;
  const dateNow: string = props.dateNow ;

  const [show, setShow] = useState(false);
  const [currentCP, setCurrentCp] = useState<number>(0);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      <div className={'charging-queue-wrapper'}>
        <div className={'widgets'}>
          <ChargingPoints />
          <HourlyConsumption currentConsumption={props.currentConsumption} />
          <ElectricityBuyRates />
        </div>
        <div className={'table-wrapper'}>
        <div className={'charging-queue-summary'}>
          <div className={'box connected-cars-wrapper'}>
            <span>CP Status</span>
            <ConnectedCarsContent rowData={rowData} />
          </div>
          <div className={'box'}>
            {dateNow}
          </div>
        </div>
        <GridTable config={getChargingGridOptions({showModal, setCurrentCp})} rowData={rowData} currentIndex={props.currentIndex} />
        </div>
      </div>

      <Modal show={show} currentCP={currentCP} rowData={rowData} handleClose={hideModal} />
    </>
  );
}

export default Charging;
