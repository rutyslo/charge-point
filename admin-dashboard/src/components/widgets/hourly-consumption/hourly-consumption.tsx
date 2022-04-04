import './hourly-consumption.scss';

const HourlyConsumption = () => {

  return (
    <div className={'hourly-consumption-wrapper'}>
      <div className={'title'}>Consumption</div>
      <div className={'widget-container'}>
        Current
        <div className={'current'}>
          132 kWh
        </div>
        Limit consumption to
        <div className={'limit'}>
          <input defaultValue={132} /> kWh
        </div>
      </div>
    </div>
  );
}

export default HourlyConsumption;