import {ReactComponent as Connected} from "../../../assets/connected.svg";
import {ReactComponent as Charging} from "../../../assets/car-charge.svg";
import {ReactComponent as Discharging} from "../../../assets/car-discharge.svg";
import {ReactComponent as Paused} from "../../../assets/car-paused.svg";
import {ReactComponent as Done} from "../../../assets/car-done.svg";

const ConnectedCarsContent = (props: any) => {

  return (
    <>
      <section>
        <Connected/>
        <span>Connected:</span>
        <span className={'count'}>{props.rowData.length}</span>
      </section>
      <section>
        <Charging/>
        <span>Charging:</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 1).length}</span>
      </section>
      <section>
        <Discharging/>
        <span>Discharging:</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 2).length}</span>
      </section>
      <section>
        <Paused/>
        <span>Idle:</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 0).length}</span>
      </section>
      <section>
        <Done/>
        <span>Waiting for pickup:</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 3).length}</span>
      </section>
    </>
  )
}

export default ConnectedCarsContent;