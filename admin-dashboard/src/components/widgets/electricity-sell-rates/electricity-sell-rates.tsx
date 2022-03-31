// import React from "react";
// import { Chart } from "react-google-charts";
//
// const getTime = (date: Date) => {
//   return `${date.getHours().toFixed(2)}:${date.getMinutes().toFixed(2)}`
// }
//
// const columns = [
//   { type: "number", id: "¢/kWh" },
//   { type: "date", id: "Start" },
//   { type: "date", id: "End" },
// ];
//
// const rows = [
//   [9.9, new Date(0,0,0,0,15,0), new Date(0,0,0,1,30,0)],
//   [10.7, new Date(0,0,0,23,0,0), new Date(0,0,0,0,15,0)],
//   [11, new Date(0,0,0,22,15,0), new Date(0,0,0,23,0,0)],
//   [11.3, new Date(0,0,0,21,15,0), new Date(0,0,0,22,15,0)],
//   [11.9, new Date(0,0,0,20,15,0), new Date(0,0,0,21,15,0)],
//   [12.9, new Date(0,0,0,19,15,0), new Date(0,0,0,20,15,0)],
//   [14.2, new Date(0,0,0,18,15,0), new Date(0,0,0,19,15,0)],
//   [13.9, new Date(0,0,0,17,15,0), new Date(0,0,0,18,15,0)],
//   [13.7, new Date(0,0,0,16,30,0), new Date(0,0,0,17,15,0)],
//   [13.8, new Date(0,0,0,15,30,0), new Date(0,0,0,16,30,0)],
//   [14, new Date(0,0,0,14,30,0),new Date(0,0,0,15,30,0)],
//   [14.5, new Date(0,0,0,13,30,0),new Date(0,0,0,14,30,0)],
//   [15, new Date(0,0,0,10,30,0),new Date(0,0,0,13,30,0)],
//   [13.9, new Date(0,0,0,8,0,0),new Date(0,0,0,10,30,0)],
//   [12.9, new Date(0,0,0,7,0,0),new Date(0,0,0,8,0,0)],
//   [11.5, new Date(0,0,0,5,0,0), new Date(0,0,0,7,0,0)],
//   [8, new Date(0,0,0,4,0,0), new Date(0,0,0,5,0,0)],
// ];
//
// export const data = [columns, ...rows];
//
// export function ElectricityBuyRates() {
//   return <Chart chartType="Timeline" data={data} width="400px" height="250px" />;
// }

import React from 'react';

// import {
//   Chart, CommonSeriesSettings, Legend, SeriesTemplate, Animation, ArgumentAxis, Tick, Title,
// } from 'devextreme-react/chart';
// import dataSource from './data.js';

// const axisCategories = ['Royal Houses'];

// const ElectricitySellRates = () => {
//     return (
//       <Chart id="chart" dataSource={dataSource} barGroupPadding={0.2} rotated={true} width={'550px'}>
//         {/*<ArgumentAxis categories={axisCategories}>*/}
//         {/*  <Tick visible={false} />*/}
//         {/*</ArgumentAxis>*/}
//         <Title text="Elecrticity sell rates"
//                subtitle="(Future costs are based on charging history per day and hour)"
//         />
//         <CommonSeriesSettings
//           type="rangeBar"
//           argumentField="kWh"
//           rangeValue1Field="start"
//           rangeValue2Field="end"
//           barOverlapGroup="kWh"
//         />
//         <Legend verticalAlignment="bottom" horizontalAlignment="center" />
//         {/*</Legend>*/}
//         <SeriesTemplate nameField="kWh" />
//         <Animation enabled={false} />
//       </Chart>
//     );
// };

import {Bubble} from "react-chartjs-2";
import moment from "moment";

const ElectricitySellRates = () => {
  const data = {
    datasets: [
      {
        label: "Electric Tariff",
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        pointStyle: 'rect',
        radius: 12,
        data: [],
        order: 1,
      },
      {
        label: 'Low tariff',
        data: [],
        backgroundColor: "rgb(75, 192, 192, 0.2)",
        borderColor: 0,
        borderWidth: 0,
        fill: true,
        lineTension: 0,
        pointStyle: 'line',
        type: 'line',
        order: 2
      }
    ]
  };
  const options = {
    elements: {
      line: {
        tension: 10
      }
    },
    layout: {
      padding: {
        left: 100,
        right: 100,
        top: 10,
        bottom:200
      }
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: function (chart: any) {
              chart.data.datasets[0].data.push({
                x: moment(),
                y: 2 //number
              });
              chart.data.datasets[1].data.push({
                x: moment(),
                y: 10
              });
            },
            duration: 20000,
            refresh: 100,
            delay: 100,
            time: {
              displayFormat: "h:mm"
            }
          },
          ticks: {
            minUnit: "second",
            stepSize: 5,
            min:0 ,
            max: 10,
            sampleSize: 15,
            autoSkip: true,
            autoSkipPadding: 100,
            source: "auto",
            callback: function (value: any) {
              return moment(value, "h:mm:ss").format("HH:mm:ss");
            }
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Cents',
            fontSize: 20
          },
          ticks: {
            beginAtZero: true,
            max: 25
          }
        }
      ]
    }
  };

  return <Bubble data={data} options={options}/>
};

export default ElectricitySellRates;
