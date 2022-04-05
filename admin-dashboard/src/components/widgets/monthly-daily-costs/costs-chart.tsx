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
  return (
    <Chart
      id="chart"
      palette={['#009FDB90', '#009FDB60', '#009FDB30']}
      rotated={true}
      dataSource={props.data}>
      <Size height={220} />
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
        <Label>
          <Format type={props.format === 'monthly' ? 'thousands' : 'fixedPoint'} />
        </Label>
        <VisualRange endValue={props.format === 'monthly' ? 2000 : 80} />
      </ValueAxis>
      <SeriesTemplate nameField="category" />
      <Legend visible={false} />
      <Animation enabled={false} />
    </Chart>
  )
}

export default CostsChart;