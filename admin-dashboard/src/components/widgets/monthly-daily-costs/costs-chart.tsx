import {
  Animation,
  ArgumentAxis, Chart,
  CommonSeriesSettings,
  Format,
  Label, Legend,
  SeriesTemplate,
  Size,
  Tick,
  ValueAxis, VisualRange
} from "devextreme-react/chart";

const CostsChart = (props: any) => {
  const customizeText = (axisValue: any) => {
    if (props.format === 'monthly') {
      if (props.type === 'charging') {
        return `$${axisValue.value/1000}K`;
      } else {
        return `${axisValue.value/1000000}MW`;
      }
    }

    return `$${axisValue.value}`;
  }

  return (
    <Chart
      id="chart"
      palette={['#009FDB90', '#009FDB60', '#009FDB30']}
      rotated={true}
      dataSource={props.data}>
      <Size height={220} width={props.format === 'monthly' ? 300 : 250} />
      <CommonSeriesSettings
        argumentField="category"
        valueField="cost"
        type="bar"
        ignoreEmptyPoints={true}
      />

      <ArgumentAxis>
        <Label alignment={'left'} font={{size: '14px'}} />
        <Tick visible={false} />
      </ArgumentAxis>
      <ValueAxis grid={{visible: true}} minorGrid={{visible: true}} name={'aaa'}>
        <Label customizeText={customizeText}>
          <Format type={props.format === 'monthly' ? (props.type === 'discharging' ? 'millions' : 'thousands') : 'fixedPoint'} currency={'USD'} />
        </Label>
        {/*<VisualRange endValue={props.format === 'monthly' ? (props.type === 'discharging' ? 3000000 : 2000) : (props.type === 'discharging' ? 150 : 100)} />*/}
      </ValueAxis>
      <SeriesTemplate nameField="category" />
      <Legend visible={false} />
      <Animation enabled={false} />
    </Chart>
  )
}

export default CostsChart;