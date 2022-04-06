import {ReactComponent as Connected} from "../../../assets/connected.svg";
import {ReactComponent as ChargingGreen} from "../../../assets/car-charge-green.svg";
import {ReactComponent as Idle} from "../../../assets/car-idle.svg";
import {ReactComponent as Done} from "../../../assets/car-done.svg";

import {ReactComponent as ConnectedPurple} from "../../../assets/connected-purple.svg";
import {ReactComponent as ChargingPurple} from "../../../assets/car-charge-purple.svg";
import {ReactComponent as DischargingPurple} from "../../../assets/car-discharge-purple.svg";
import {ReactComponent as IdlePurple} from "../../../assets/car-idle-purple.svg";
import {ReactComponent as DonePurple} from "../../../assets/car-done-purple.svg";

const ConnectedCarsContent = (props: any) => {

  return (
    <>
      <section>
        {props.isHome ? <ConnectedPurple/> : <Connected/>}
        <span className={'status'}>Connected</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status !== 0).length}</span>
      </section>
      <section>
        {props.isHome ? <ChargingPurple/> : <ChargingGreen/>}
        <span className={'status'}>Charging</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 1).length}</span>
      </section>
      <section>
        <DischargingPurple/>
        <span className={'status'}>Discharging</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 2).length}</span>
      </section>
      <section>
        {props.isHome ? <IdlePurple/> : <Idle/>}
        <span className={'status'}>Idle</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 3).length}</span>
      </section>
      <section>
        {props.isHome ? <DonePurple/> : <Done/>}
        <span className={'status'}>Waiting for pickup</span>
        <span className={'count'}>{props.rowData.filter((item: any) => item.status === 4).length}</span>
      </section>
    </>
  )
}

export default ConnectedCarsContent;