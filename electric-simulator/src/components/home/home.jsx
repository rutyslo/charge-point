import React, {useMemo, useState} from "react";
import {Bubble} from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./home.scss";
import moment from "moment";
import {ReactComponent as Icon} from './../../assets/images/power-outage.svg';
import Switch from "react-switch";
import axios from "axios";

const ENDPOINT = "ws://localhost:7000/";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
};

const color = Chart.helpers.color;


function Home() {

    let number;
    let isPower = true;

    const data = {
        datasets: [
            {
                label: "Electric Tariff",
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
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
                backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
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
                        onRefresh: function (chart) {
                            chart.data.datasets[0].data.push({
                                x: moment(),
                                y: number
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
                        callback: function (value) {
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
    const socket = new WebSocket(ENDPOINT);

    const isPowerToggle = useMemo(() => toggle(isPower), [isPower]);

    function toggle(toggle) {
        return !toggle;
    }

    socket.onopen = function(evt) {
        console.log("onopen");
    }

    socket.onmessage = function(msg) {
        console.log("RECEIVE: " + msg.data);
        const object = JSON.parse(msg.data);
        number = parseInt(object.cent);
        let powerElement = document.getElementsByClassName("power-out-wrapper")[0];
        powerElement.classList.remove(isPower.toString());
        isPower = Boolean(object.isPower);
        powerElement.classList.add(isPower.toString());
        document.getElementsByClassName("cost")[0].innerHTML = number.toString();
        const colorLine = (isPower) ? chartColors.blue : chartColors.grey;
        data.datasets[0].backgroundColor = colorLine;
        data.datasets[0].borderColor = colorLine;
    };

    const sendIsPower = () => {
        axios.post('http://localhost:4000/power', { isPower : !isPower })
            .then(response => {
                isPower = response.data.isPower;
            });
    }

    return (
        <div className="chart-wrapper">
            <div className={"is-power-toggle"}>
                {/*<Switch*/}
                {/*    key={1}*/}
                {/*    width={60}*/}
                {/*    checked={isPowerToggle}*/}
                {/*    onChange={sendIsPower}*/}
                {/*    className="switch-is-smart react-switch"*/}
                {/*    onColor="#0057B8"*/}
                {/*    id="normal-switch"*/}
                {/*    uncheckedIcon={<></>}*/}
                {/*/>*/}
            </div>
            <div className={'cost-wrapper'}>
                <span className={'title'}>Now:</span>
                <span className={'cost'}></span>
            </div>
            <div className={'power-out-wrapper'}>
                <Icon className={'icon'}/>
                Power Outage
            </div>
            <Bubble data={data} options={options}/>
        </div>
    );
};



export default Home;