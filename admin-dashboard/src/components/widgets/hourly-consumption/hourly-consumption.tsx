import './hourly-consumption.scss';

const HourlyConsumption = (props: any) => {

  return (
    <div className={'hourly-consumption-wrapper'}>
      <div className={'title'}>Consumption</div>
      <div className={'widget-container'}>
        Current
        <div className={'current'}>
            {props.currentConsumption} kWh
        </div>
        Limit consumption to
        <div className={'limit'}>
          <input defaultValue={200} /> kWh
        </div>
      </div>
    </div>
  );
}

export default HourlyConsumption;