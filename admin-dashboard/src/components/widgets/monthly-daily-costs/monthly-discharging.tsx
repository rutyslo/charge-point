import {ReactComponent as ArrowRedDown} from "../../../assets/arrow-down-red.svg";
import {ReactComponent as ArrowGreenUp} from "../../../assets/arrow-up-green.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const MonthlyDischarging = () => {

  const data = [
    { category: `<b>Gained MTD</b><br />Mar 1 - 12`, cost: 854 },
    { category: `<b>Proj. /month</b><br />Mar, 2022`, cost: 2000 },
    { category: `<b>Avg. /month</b><br />02/21 - 02/22`, cost: 2000 }
  ].reverse();

  return (
    <div className={'monthly-discharging-chart costs-chart'}>
      <div className={'title'}>Monthly <b>discharging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'monthly'} />
        <div className={'prices-summary'}>
          <div className={'price'}>$854/77 kW <ArrowRedDown /></div>
          <div className={'price'}>$2,000/88 kW <ArrowGreenUp /></div>
          <div className={'price'}>$2,000/88 kW <ArrowGreenUp /></div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDischarging;