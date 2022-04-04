import {ReactComponent as Connected} from "../../../assets/connected.svg";
import {ReactComponent as Charging} from "../../../assets/charging.svg";
import {ReactComponent as Discharging} from "../../../assets/discharging1.svg";
import {ReactComponent as Waiting} from "../../../assets/waiting.svg";
import './connected-cars.scss';

const ConnectedCars = (props: any) => {

  return (
    <div className={'connected-cars-wrapper'}>
      <div className={'title'}>Connected cars</div>
      <div className={'widget-container'}>
        <section>
          <Connected/>
          <span>Now</span>
          <span className={'count'}>{props.rowData.length}</span>
        </section>
        <section>
          <Charging/>
          <span>Charging</span>
          <span className={'count'}>{props.rowData.filter((item: any) => item.status === 1).length}</span>
        </section>
        <section>
          <Discharging/>
          <span>Discharging</span>
          <span className={'count'}>{props.rowData.filter((item: any) => item.status === 2).length}</span>
        </section>
        <section>
          <Waiting/>
          <span>Idle</span>
          <span className={'count'}>{props.rowData.filter((item: any) => [0, 3].includes(item.status)).length}</span>
        </section>
      </div>
    </div>
  );
}

export default ConnectedCars;