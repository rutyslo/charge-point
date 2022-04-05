import {ReactComponent as Charging} from '../../assets/car-charge.svg';
import {ReactComponent as Discharging} from '../../assets/car-discharge.svg';
import {ReactComponent as Paused} from '../../assets/car-paused.svg';
import {ReactComponent as Done} from '../../assets/car-done.svg';

const ChargeStatus = (props: any) => {

  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div className={"charge-status"}>
      {cellValue === 0 && <Paused />}
      {cellValue === 1 && <Charging />}
      {cellValue === 2 && <Discharging />}
      {cellValue === 3 &&  <Done />}
    </div>
  )
}

export default ChargeStatus;