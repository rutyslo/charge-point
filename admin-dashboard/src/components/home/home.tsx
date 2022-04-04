import './home.scss';
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";
import ElectricityBuyRates from "../widgets/electricity-buy-rates/electricity-buy-rates";
import ConnectedCars from "../widgets/connected-cars/connected-cars";

const Home = (props: any) => {
  return (
    <div className={'home-wrapper'}>
      <div className={'row'}>
        <div className={'row-title'}>Charging</div>
        <div className={'widgets-wrapper'}>
          <HourlyConsumption />
          <ChargingPoints />
          <ConnectedCars rowData={props.rowData} />
        </div>
      </div>
      <div className={'row'}>
        <div className={'row-title'}>Electricity consumption</div>
        <div className={'widgets-wrapper'}>
          <ElectricityBuyRates />
        </div>
      </div>
      <div className={'row'}>
        <div className={'row-title'}>Discharging and charging</div>
        <div className={'widgets-wrapper'}>

        </div>
      </div>
    </div>
  );
}

export default Home;