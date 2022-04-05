import GridTable from "../grid-table/grid-table";
import './charging.scss';
import {chargingGridOptions} from "./charging-grid-config";
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";
import ElectricityBuyRates from "../widgets/electricity-buy-rates/electricity-buy-rates";
import ConnectedCarsContent from "../widgets/connected-cars/connected-cars-content";

const Charging = (props: any) => {

  const rowData: any[] = props.rowData ;
  const dateNow: string = props.dateNow ;

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
        <GridTable config={chargingGridOptions} rowData={rowData} currentIndex={props.currentIndex} />
        </div>
      </div>
    </>
  );
}

export default Charging;
