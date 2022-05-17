import React, {useEffect} from 'react';
import './car-detail.scss';
import {ReactComponent as LightningIcon} from './../../../assets/images/lightning.svg';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import appState from "../../../app.state";
import {observer} from "mobx-react-lite";

const CarDetail = observer((props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const demo = searchParams.get('demo');
    const car = appState.carList[props.index];
    const minutesLeft = car.minutesLeft;
    const hours = Math.floor(car.hours/ 60);
    const minutes = car.hours % 60;
    const navigate = useNavigate();

    useEffect(() => {
        const timerId = setInterval(() => {
            let carCopy = {...car}
            if (props.isPower) {
                if (car.isCharged && (car.percent < car.maxBattery)) {
                    if (demo === 'cp') {
                        carCopy.percent = (car.percent + 1);
                        carCopy.kw = (car.kw + 0.75);
                        carCopy.price = (car.price + ((props.electric / 100) * 0.13));
                        carCopy.mile = (car.mile + 4);
                        carCopy.hours = (car.hours + 4);
                        carCopy.minutesLeft = (car.minutesLeft - (400 / car.maxBattery));
                    }
                } else {
                    clearInterval(timerId);
                    if ( car.maxBattery >= car.percent) {
                        carCopy.isCharged = false;
                    }
                }
            } else {
                if (car.isHomeCharging && (car.percent > car.minBattery)) {
                    if (demo === 'cp') {
                        carCopy.percent = (car.percent - 1);
                        carCopy.mile = (car.mile - 4);
                        carCopy.hours = (car.hours - 4);
                        carCopy.minutesLeft = (car.minutesLeft + (400 / car.maxBattery));
                    }
                }
            }
            appState.setCar(carCopy, props.index);

        } ,1000);
        return () => clearInterval(timerId);
    });

    return (
        <div className={`car-detail ${appState.carList[props.index].isCharged ? 'charging' : 'available'}`} onClick={() => {
            appState.setIndex(props.index);
            navigate(`../info?demo=${demo}`, { replace: true})
            }}>
            <div className="left">
                <div className="car-name">{car.name}</div>
                <div className="car-type">{car.type}</div>
                <div className="battery-wrapper">
                    <div className="battery">
                        <div className={`battery-level ${hours > 2 ? 'high' : 'low'}`}></div>
                    </div>
                    <div className="car-battery-time">{hours}<span>h</span> {minutes}<span>m</span></div>
                </div>
                {appState.carList[props.index].isCharged &&
                    <div className="charging-time-wrapper">
                         <LightningIcon className={hours > 2 ? 'high' : 'low'}/>
                        <div className="charging-time">{Math.floor(minutesLeft/ 60)}<span>h</span>
                             {minutesLeft % 60}<span>m</span><span>left</span>
                            </div>
                    </div>
                }
            </div>
            <div className="right">
                <div className="more-info">
                    <span className="dot"></span>
                </div>
                <div className="car-image">
                    <img src={car.image} />
                </div>
            </div>
        </div>
    );

});


export default CarDetail;