import {ReactComponent as ArrowGreenUp} from "../../../assets/arrow-up-green.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const DailyDischarging = () => {

  const data = [
    { category: `<b>Today</b>`, cost: 120 },
    { category: `<b>Proj. /day</b><br />Mar, 2022`, cost: 120 },
    { category: `<b>Avg. /day</b><br />Feb 2021`, cost: 115 }
  ].reverse();

  return (
    <div className={'daily-discharging-chart costs-chart'}>
      <div className={'title'}>Daily <b>discharging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'daily'} type={'discharging'} />
        <div className={'prices-summary'}>
          <div className={'price'}>{`$${data[2].cost}`} <ArrowGreenUp /></div>
          <div className={'price'}>{`$${data[1].cost}`} <ArrowGreenUp /></div>
          <div className={'price'}>{`$${data[0].cost}`}</div>
        </div>
      </div>
    </div>
  );
};

export default DailyDischarging;