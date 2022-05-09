import React, {useMemo, useState} from "react";
import {Bubble} from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./home.scss";
import moment from "moment";
import ElectricRegion from "../electric-region/electric-region";
import {ReactComponent as Logo} from "../../assets/images/logo-con.svg";
import {useSearchParams} from "react-router-dom";

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
    const [searchParams, setSearchParams] = useSearchParams();

    const isIframe = searchParams.get("type") === 'iframe';
    const size = isIframe ? 1 : 2;
    const padding = isIframe ? 10 : 100;
    const paddingBottom = isIframe ? 10 : 150;

    const data = {
        datasets: [
            {
                label: "Electric Tariff",
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
                fill: false,
                lineTension: 0,
                borderDash: [2 * size , 1 * size],
                pointStyle: 'rect',
                radius: 4 * size,
                data: [],
                order: 1,
            },
            {
                label: 'Charging threshold',
                backgroundColor: chartColors.green,
                borderColor: chartColors.green,
                fill: false,
                lineTension: 0,
                borderDash: [4 * size, 2 * size],
                pointStyle: 'rect',
                radius: 6  * size,
                data: [],
                order: 3
            },
            {
                label: 'Discharging threshold',
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                fill: false,
                lineTension: 0,
                borderDash: [2 * size, 1 * size],
                pointStyle: 'rect',
                radius: 6 * size,
                data: [],
                order: 4
            },
        ]
    };

    if (!isIframe) {
        data.datasets.push({
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
        });
    }
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 10
            }
        },
        layout: {
            padding: {
                left: padding,
                right: padding,
                top: 10,
                bottom: paddingBottom
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
                                y: 8
                            });
                            chart.data.datasets[2].data.push({
                                x: moment(),
                                y: 20
                            });
                            if (!isIframe) {
                                chart.data.datasets[3].data.push({
                                    x: moment(),
                                    y: 10
                                });
                            }
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

    socket.onopen = function(evt) {
        console.log("onOpen");
    }

    socket.onmessage = function(msg) {
        console.log("RECEIVE");
        const object = JSON.parse(msg.data);
        if (object.type === 'electricity') {
            number = parseInt(object.value.cent);
            isPower = Boolean(object.value.isPower);
            document.getElementsByClassName("cost")[0].innerHTML = number.toString();
            const colorLine = (isPower) ? chartColors.blue : chartColors.grey;
            data.datasets[0].backgroundColor = colorLine;
            data.datasets[0].borderColor = colorLine;
        }

    };

    return (
        <div className={`chart-wrapper ${isIframe ? 'iframe' : ''}`}>
            {!isIframe ? <div className={"header"}>
                <Logo className={"logo-icon"} width={190} height={37}/>
                <div className={'cost-wrapper'}>
                    <span className={'title'}>Now:</span>
                    <span className={'cost'}></span>
                </div>
                <ElectricRegion />
            </div> : <></>}

            <Bubble data={data} options={options}/>
        </div>
    );
};



export default Home;