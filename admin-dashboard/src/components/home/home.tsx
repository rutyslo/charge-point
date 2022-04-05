import './home.scss';
import ChargingPoints from "../widgets/charging-points/charging-points";
import HourlyConsumption from "../widgets/hourly-consumption/hourly-consumption";
import ElectricityBuyRates from "../widgets/electricity-buy-rates/electricity-buy-rates";
import ConnectedCars from "../widgets/connected-cars/connected-cars";
import PowerConsumptionThresholds from "../widgets/power-consumption-thresholds/power-consumption-thresholds";
import MonthlyDischarging from "../widgets/monthly-daily-costs/monthly-discharging";
import DailyDischarging from "../widgets/monthly-daily-costs/daily-discharging";
import MonthlyCharging from "../widgets/monthly-daily-costs/monthly-charging";
import DailyCharging from "../widgets/monthly-daily-costs/daily-charging";

const Home = (props: any) => {
  return (
    <div className={'home-wrapper'}>
      <div className={'row'}>
        <div className={'row-title'}>Charge Points Details</div>
        <div className={'widgets-wrapper'}>
          <HourlyConsumption />
          <ChargingPoints />
          <ConnectedCars rowData={props.rowData} />
        </div>
      </div>
      <div className={'row'}>
        <div className={'row-title'}>Electricity Rates</div>
        <div className={'widgets-wrapper'}>
          <PowerConsumptionThresholds />
          <ElectricityBuyRates />
        </div>
      </div>
      <div className={'row'} style={{display: 'flex', gap: '16px'}}>
        <div className={'item'}>
          <div className={'row-title'}>Discharging Gains</div>
          <div className={'widgets-wrapper'}>
            <MonthlyDischarging />
            <DailyDischarging />
          </div>
        </div>
        <div className={'item'}>
          <div className={'row-title'}>Charging Costs</div>
          <div className={'widgets-wrapper'}>
            <MonthlyCharging />
            <DailyCharging />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;