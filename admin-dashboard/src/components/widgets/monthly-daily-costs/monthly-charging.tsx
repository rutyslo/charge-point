import {ReactComponent as ArrowRedUp} from "../../../assets/arrow-up-red.svg";
import {ReactComponent as ArrowGreenDown} from "../../../assets/arrow-down-green.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const MonthlyCharging = () => {

  const data = [
    { category: `<b>Gained MTD</b><br />Mar 1 - 12`, cost: 854 },
    { category: `<b>Proj. /month</b><br />Mar, 2022`, cost: 2301 },
    { category: `<b>Avg. /month</b><br />02/21 - 02/21`, cost: 2311 }
  ].reverse();

  return (
    <div className={'monthly-charging-chart costs-chart'}>
      <div className={'title'}>Monthly <b>charging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'monthly'} />
        <div className={'prices-summary'}>
          <div className={'price'}>{`$${data[2].cost}`} <ArrowRedUp /></div>
          <div className={'price'}>{`$${data[1].cost}`} <ArrowRedUp /></div>
          <div className={'price'}>{`$${data[0].cost}`} <ArrowGreenDown /></div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCharging;