import {ReactComponent as Charging} from '../../assets/car-charge.svg';
import {ReactComponent as Discharging} from '../../assets/car-discharge.svg';
import {ReactComponent as Idle} from '../../assets/car-idle.svg';
import {ReactComponent as Done} from '../../assets/car-done.svg';

const ChargeStatus = (props: any) => {

  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div className={"charge-status"}>
      {(cellValue === 1 || cellValue === 5) && <Charging />}
      {cellValue === 2 && <Discharging />}
      {cellValue === 3 &&  <Idle />}
      {cellValue === 4 &&  <Done />}
    </div>
  )
}

export default ChargeStatus;