import './power-consumption-thresholds.scss';

const PowerConsumptionThresholds = () => {

  return (
    <div className={'power-consumption-thresholds'}>
      <div className={'title'}>Power consumption thresholds</div>
      <div className={'widget-container'}>
        <section>
          <div>
            <div className={'type-title'}>Electricity Provider</div>
            <div className={'type-condition'}>if under:</div>
          </div>
          <div className={'input'}>
            <input defaultValue={8.888} /> ¢/kWh
          </div>
        </section>
        <section>
          <div>
            <div className={'type-title'}>Power the Airport</div>
            <div className={'type-condition'}>if over:</div>
          </div>
          <div className={'input'}>
            <input defaultValue={8.888} /> ¢/kWh
          </div>
        </section>
      </div>
    </div>
  )
};

export default PowerConsumptionThresholds;