import React from 'react';
import './car-detail.scss';
import {ReactComponent as LightningIcon} from './../../../assets/images/lightning.svg';
import { useNavigate } from "react-router-dom";

function CarDetail(props) {
    const car =  props.car;
    const isCharging = car.id === 1;
    const chargingTimeOnMin = 181;
    const hours = Math.floor(car.batteryTime/ 60);
    const minutes = car.batteryTime % 60;
    const navigate = useNavigate();

    return (
        <div className={`car-detail ${isCharging ? 'charging' : 'available'}`} onClick={() => { navigate("../info", { replace: true, state : { car } })}}>
            <div className="left">
                <div className="car-name">{car.name}</div>
                <div className="car-type">{car.type}</div>
                <div className="battery-wrapper">
                    <div className="battery">
                        <div className={`battery-level ${hours > 2 ? 'high' : 'low'}`}></div>
                    </div>
                    <div className="car-battery-time">{hours}<span>h</span> {minutes}<span>m</span></div>
                </div>
                {isCharging &&
                    <div className="charging-time-wrapper">
                         <LightningIcon className={hours > 2 ? 'high' : 'low'}/>
                        <div className="charging-time">{Math.floor(chargingTimeOnMin/ 60)}<span>h</span>
                             {chargingTimeOnMin % 60}<span>m</span><span>left</span>
                            </div>
                    </div>
                }
            </div>
            <div className="right">
                <div className="more-info">
                    <span className="dot"></span>
                </div>
                <div className="car-image">
                    <img src={car.image} height={150} width={270}/>
                </div>
            </div>
        </div>
    );

}


export default CarDetail;