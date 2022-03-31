import {ReactComponent as Stopped} from '../../assets/stopped-status.svg';
import {ReactComponent as Charging} from '../../assets/charging-status.svg';
import {ReactComponent as Discharging} from '../../assets/discharging-status.svg';

const ChargeStatus = (props: any) => {

  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div className={"charge-status"}>
      {cellValue === 0 && <Stopped />}
      {cellValue === 1 && <Charging />}
      {cellValue === 2 && <Discharging />}
    </div>
  )
}

export default ChargeStatus;