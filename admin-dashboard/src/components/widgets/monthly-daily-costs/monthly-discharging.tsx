import {ReactComponent as ArrowGreenUp} from "../../../assets/arrow-up-green.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const MonthlyDischarging = () => {

  const data = [
    { category: `<b>Gained MTD</b><br />Mar 1 - 12`, cost: 7040000 },
    { category: `<b>Proj. /month</b><br />Mar, 2022`, cost: 15340000 },
    { category: `<b>Avg. /month</b><br />02/21 - 02/22`, cost: 14900000 }
  ].reverse();

  return (
    <div className={'monthly-discharging-chart costs-chart'}>
      <div className={'title'}>Monthly <b>discharging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'monthly'} type={'discharging'} />
        <div className={'prices-summary'}>
          <div className={'price'}>$1408 / 7.04MW <ArrowGreenUp /></div>
          <div className={'price'}>$3068 / 15.34MW <ArrowGreenUp /></div>
          <div className={'price'}>$2980  / 14.9MW </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDischarging;