import {ReactComponent as ChargePoint} from "../../../assets/charge-point.svg";
import './charging-points.scss';

const ChargingPoints = () => {

  const renderPoints = () => {
    return Array.from({ length: 16 }, (_, k) => (
      <div style={{padding: '0.5px 2px'}} key={k}><ChargePoint/></div>
    ));
  };

  return (
    <div className={'charging-points-wrapper'}>
      <div className={'title'}>Charging Points</div>
      <div className={'widget-container'}>
        <div className={'box'}>
          <div className={'line'}>
            <span>Available:</span><b className={'number'}>16</b>
          </div>
          <div className={'line'}>
            <span>Out of service:</span><b className={'number'}>0</b>
          </div>
          <div className={'line'}>
            <span>Maintenance:</span><b className={'number'}>16</b>
          </div>
          <div className={'line'}>
            <b>Total:</b><b className={'number'}>16</b>
          </div>
        </div>
        <div className={'box'} style={{height: '185px', columnCount: 2, columnWidth: '12px', columnGap: 0, columnFill: 'auto'}}>
          {renderPoints()}
        </div>
      </div>
    </div>
  )
}

export default ChargingPoints;