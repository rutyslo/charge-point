import {ReactComponent as Stopped} from '../../assets/stopped-status.svg';
import {ReactComponent as Charging} from '../../assets/charging1.svg';
import {ReactComponent as Discharging} from '../../assets/discharging1.svg';

const ChargeStatus = (props: any) => {

  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div className={"charge-status"}>
      {cellValue === 0 && 'PAUSED'}
      {cellValue === 1 && <Charging />}
      {cellValue === 2 && <Discharging />}
      {cellValue === 3 &&  'DONE'}
    </div>
  )
}

export default ChargeStatus;