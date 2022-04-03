import React, {useEffect, useState} from 'react';
import {
  Chart,
  CommonSeriesSettings,
  Legend,
  SeriesTemplate,
  Animation,
  ArgumentAxis,
  Tick,
  Title,
  CommonAxisSettings, Size, VisualRange
} from 'devextreme-react/chart';
import dataSource from './data.js';

const ElectricityBuyRates = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const sortedData = dataSource.sort((a: any, b: any) => a.cent > b.cent ? 1 : -1);
    setData(sortedData);
  }, []);

  return (
      <Chart id="chart" dataSource={data} barGroupPadding={0.2} rotated={true}>
        <Size width={800} />
        <ArgumentAxis categories={['cent']} allowDecimals={false}
                      title={{text: '¢/kWh',
                        font: {family: 'Helvetica Neue, sans-serif', size: '12px', weight: 600},
                      }}>
          <VisualRange
            startValue={8}
            endValue={15}
            length={1}
          />
        </ArgumentAxis>
        <Title text="Electricity buy rates"
               font={{family: 'Helvetica Neue, sans-serif', size: '16px', weight: 600}}
               alignment={'left'} margin={0}
               subtitle={{
                 text: "(Future costs are based on charging history per day and hour)",
                 font: {family: 'Helvetica Neue, sans-serif', size: '14px'}
               }}
        />
        <CommonAxisSettings grid={{visible: true}} minorGrid={{visible: true}} allowDecimals={false} />
        <CommonSeriesSettings
          type="rangeBar"
          argumentField="cent"
          rangeValue1Field="start"
          rangeValue2Field="end"
          barOverlapGroup="cent"
          maxLabelCount={15}
        />
        <Legend visible={false} />
        <SeriesTemplate nameField="cent" />
        <Animation enabled={false} />
      </Chart>
    );
};

export default ElectricityBuyRates;
