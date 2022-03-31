import './hourly-consumption.scss';

const HourlyConsumption = () => {

  return (
    <div className={'hourly-consumption-wrapper'}>
      <div className={'title'}>Limit hourly consumption to:</div>
      <div className={'widget-container'}>
        <div className={'input'}>
          <input value={132}/>kWh
        </div>
        <div style={{textAlign: 'left'}}>Recommended: 132 Kw/h</div>
        <a>
          Learn more
        </a>
      </div>
    </div>
  );
}

export default HourlyConsumption;