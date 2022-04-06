import {ReactComponent as ArrowGreenDown} from "../../../assets/arrow-down-green.svg";
import './costs-chart-components.scss';
import CostsChart from "./costs-chart";

const DailyCharging = () => {

  const data = [
    { category: `<b>Today</b>`, cost: 49.4 },
    { category: `<b>Proj. /day</b><br />Mar, 2022`, cost: 49.4 },
    { category: `<b>Avg. /day</b><br />Feb 2021`, cost: 51.6 }
  ].reverse();

  return (
    <div className={'daily-charging-chart costs-chart'}>
      <div className={'title'}>Daily <b>charging</b></div>
      <div className={'widget-container'}>
        <CostsChart data={data} format={'daily'} type={'charging'} />
        <div className={'prices-summary'}>
          <div className={'price'}>{`$${data[2].cost}`} <ArrowGreenDown /></div>
          <div className={'price'}>{`$${data[1].cost}`} <ArrowGreenDown /></div>
          <div className={'price'}>{`$${data[0].cost}`} </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCharging;