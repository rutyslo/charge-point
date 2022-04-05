import {ReactComponent as ArrowRedDown} from "../../../assets/arrow-down-red.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const DailyDischarging = () => {

  const data = [
    { category: `<b>Today</b>`, cost: 34.58 },
    { category: `<b>Proj. /day</b><br />Mar, 2022`, cost: 82 },
    { category: `<b>Avg. /day</b><br />Feb 2021`, cost: 55 }
  ].reverse();

  return (
    <div className={'daily-discharging-chart'}>
      <div className={'title'}>Daily <b>discharging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'daily'} />
        <div className={'prices-summary'}>
          <div className={'price'}>{`$${data[2].cost}`} <ArrowRedDown /></div>
          <div className={'price'}>{`$${data[1].cost}`} <ArrowRedDown /></div>
          <div className={'price'}>{`$${data[0].cost}`} <ArrowRedDown /></div>
        </div>
      </div>
    </div>
  );
};

export default DailyDischarging;