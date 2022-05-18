import React, {useState, useEffect} from 'react';
import './status.scss'
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {ReactComponent as BatteryLines} from "../../../assets/images/battery-lines.svg";
import Switch from "react-switch";
import SuperSimple from "../../range/SuperSimple";
import {ReactComponent as PowerOutageIcon} from "../../../assets/images/power_outage.svg";
import appState from "../../../app.state";


function Status(props) {
    const { state } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const demo = searchParams.get('demo');
    const navigate = useNavigate();
    const car = appState.carList[appState.carIndex];
    const [isCharged, setIsCharged] = useState(car.isCharged);
    const [minutesLeft, setMinutesLeft] = useState(car.minutesLeft);
    const [isSmartCharging, setIsSmartCharging] = useState(car.isSmartCharging);
    const [isHomeCharging, setIsHomeCharging] = useState(car.isHomeCharging);
    const [percent, setPercent] = useState(car.percent);
    const [kw, setKw] = useState(car.kw);
    const [price, setPrice] = useState(car.price);
    const [mile, setMile] = useState(car.mile);
    const [maxBattery, setMaxBattery] = useState(car.maxBattery);
    const [showMaxBattery, setShowMaxBattery] = useState(false);
    const [minBattery, setMinBattery] = useState(car.minBattery);
    const [showMinBattery, setShowMinBattery] = useState(false);
    const [hours, setHours] = useState(Math.floor(car.hours));
    const [prevIsPower, setPrevIsPower] = useState(true);

    useEffect(() => {
        if (props.isPower) {
            if (isSmartCharging && (percent < maxBattery)) {
                if (props.electric > 10 && isCharged) {
                    setIsCharged(false);
                } else if(props.electric <= 10 && !isCharged) {
                    setIsCharged(true);
                }

            } else if (!isSmartCharging && !prevIsPower && (percent < maxBattery)){
                setIsCharged(true);
            }
        } else {
            setIsCharged(false);
        }
        setPrevIsPower(props.isPower);

    }, [props.electric, props.isPower]);

    useEffect(() => {
        if (demo !== 'cp') {
            setMinutesLeft(props.timeToFullCharge);
            setPercent(props.batteryLevel);
        }

    }, [props.timeToFullCharge, props.batteryLevel]);

    useEffect(() => {
        if (demo === 'cp') {
            setMinutesLeft(Math.ceil(400 / maxBattery) * maxBattery * (maxBattery - percent) / 100);
        }
    }, [isSmartCharging, maxBattery]);

    useEffect(() => {
        const req = JSON.stringify({"ChargeNotification" : isCharged });
        if (req) {
            handleSend(req);
        }
    }, [isCharged]);

    const handleSend = (req) => {
        if (props.socket.readyState === WebSocket.OPEN) {
            console.log('sendChargingNotification', req)
            props.socket.send(req)
        } else {
            setTimeout(() => { handleSend() }, 1000)
        }
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            if (props.isPower) {
                if (isCharged && (percent < maxBattery)) {
                    if (demo === 'cp') {
                        setPercent(percent + 1);
                        setKw(kw + 0.75);
                        setPrice(price + ((props.electric / 100) * 0.13));
                        setMile(mile + 4);
                        setHours(hours + 4);
                        setMinutesLeft(minutesLeft - (400 / maxBattery));
                    }

                } else {
                    clearInterval(timerId);
                    if (maxBattery >= percent) {
                        setIsCharged(false);
                    }
                }
            } else {
                if (isHomeCharging && (percent > minBattery)) {
                    if (demo === 'cp') {
                        setPercent(percent - 1);
                        setMile(mile - 4);
                        setHours(hours - 4);
                        setMinutesLeft(minutesLeft + (400 / maxBattery));
                    }
                }
            }

        } ,1000);
        return () => clearInterval(timerId);
    });

    const handleChange = nextChecked => {
        setIsCharged(!nextChecked);
    };

    const handleChangeIsSmart = nextChecked => {
        setIsSmartCharging(nextChecked);
        if (!nextChecked) {
            if (props.isPower) {
                setIsCharged(true);
            }
            setMaxBattery(100);
            // TODO - CALL CHARGING
        } else {
            setMaxBattery(85);
            if (percent > 85 || props.electric > 10) {
                setIsCharged(false);
            }
        }
    };

    const handleChangeIsHome = nextChecked => {
        setIsHomeCharging(nextChecked);
    };

    const minLeftFormat = () => {
        let hour, mins;
        if (demo === 'cp') {
             hour = Math.floor(minutesLeft / 60);
             mins = Math.floor(minutesLeft % 60 > 0 ? minutesLeft % 60 : 0);
        } else {
            hour = Math.floor(minutesLeft);
            mins = Math.round((minutesLeft - hour) * 60);
            console.log('mins', mins)
        }
        return `${hour > 0 ? `${hour}h` : `` } ${mins}m left`;
    }

    const goBack = () => {
        let carCopy = {...car};
        carCopy.isCharged = isCharged;
        carCopy.hours = hours;
        carCopy.minutesLeft = minutesLeft;
        carCopy.percent = percent;
        carCopy.mile = mile;

        carCopy.isSmartCharging = isSmartCharging;
        carCopy.isHomeCharging = isHomeCharging;
        carCopy.kw = kw;
        carCopy.maxBattery = maxBattery;
        carCopy.minBattery = minBattery;
        carCopy.price = price;
        appState.setCar(carCopy, appState.carIndex);
        navigate("../", { replace: true});
    }

    return (
        <div className={`status-wrapper ${isCharged ? 'charging' : 'not-charging'}`}>
            <div className="header" onClick={ goBack }>
                <i className="chevron-right"></i>
                <div className="title">
                    Home
                </div>
            </div>
            <div className="car-info">
                <div className="name">
                    <div className="car-name">{car.name}</div>
                    <div className="car-type">{car.type}</div>
                </div>
                <div className="image">
                    <img src={car.image}/>
                </div>
            </div>
            <div className="switch-wrapper">
                <div className="text-wrapper">
                    <div className={'time'}>
                        { isCharged ? minLeftFormat() : 'Car is connected' }
                    </div>
                    <div className="swipe">
                        {`Swipe to ${isCharged ? `stop` : `start`} charging` }
                    </div>
                </div>
                <Switch
                    key={1}
                    height={65}
                    width={window.innerWidth - 30}
                    checked={!isCharged}
                    onChange={handleChange}
                    className="switch-charging"
                    id="normal-switch"
                    disabled={(maxBattery <= percent) || !(props.isPower)}
                    uncheckedIcon={<></>}
                    checkedIcon={<></>}
                />
            </div>

            <div className={`electric-wrapper ${props.isPower ? 'power-on' : 'power-off'}`}>
                <div className="sidebar-left">
                    {props.isPower ?
                    <>
                        <div className="item">
                        <div className={"name"}>Energy supplied</div>
                        <div className={"value"}>{kw}<span>kW</span></div>
                    </div>
                    <div className="item">
                        <div className={"name"}>Cost</div>
                        <div className={"value"}>${price.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    </div>
                    </> :
                        <>
                            <div className={"name-outage"}>
                                <PowerOutageIcon />
                                <span>Power outage</span>
                            </div>
                            {isHomeCharging && (percent > minBattery) && <div className={"msg"}>
                                Emergency home power on
                            </div>}
                        </>}
                </div>
                <div className="sidebar-right">
                    <div className={"percent"}>{percent}%</div>
                    <div className="car-battery-time">
                        ~ {Math.floor(hours / 60) }h {(hours % 60)}m/{mile} mi
                    </div>
                    <div className="battery-wrapper">
                        <div className="battery">
                            <BatteryLines className={"battery-lines"}/>
                            <div className="battery-percent" style={{ height: `${percent > 98 ? 98 : percent}%` }}></div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="battery-pref">
                <div className="title">Battery Preferences</div>
                <div className="smart-charging-wrapper">
                    <div className="smart-text-wrapper">
                        <div className="section-title">
                            Smart charging
                        </div>
                        <div className="text-area">
                            Optimize charging times to keep costs low.<br />When turned off, charging starts immediately.
                        </div>
                    </div>

                    <Switch
                        key={2}
                        width={60}
                        checked={isSmartCharging}
                        onChange={handleChangeIsSmart}
                        className="switch-is-smart react-switch"
                        onColor="#0057B8"
                        id="normal-switch"
                        uncheckedIcon={<></>}
                    />
                </div>
                {isSmartCharging &&<>
                    <div className="row">
                        <div className="item-name">Need charged by</div>
                        <div className="item-value">06:15 AM Mon-Fri,
                            08:00 AM Sat-Sun</div>
                        <i className="chevron-right"></i>
                    </div>
                    <div className="row">
                        <div className="item-name">Battery maximum level</div>
                        <div className="item-value">{maxBattery}%</div>
                        <i className={`chevron-right ${showMaxBattery ? 'open' : 'close'}`} onClick={() => setShowMaxBattery(!showMaxBattery)}></i>
                    </div>
                    {showMaxBattery && <div className={"battery-max-wrapper"}>
                        <SuperSimple values={[maxBattery]} setValue={setMaxBattery}/>
                    </div>}
                </>}

                <div className={"home-charging"}>
                    <div className={"home-charging-wrapper"}>
                        <div className="smart-text-wrapper">
                            <div className="section-title">
                                Emergency home battery
                            </div>
                            <div className="text-area">
                                Upon a power outage, supply energy to home from the car battery.
                            </div>
                        </div>
                        <Switch
                            key={3}
                            width={60}
                            checked={isHomeCharging}
                            onChange={handleChangeIsHome}
                            className="switch-is-smart react-switch"
                            onColor="#0057B8"
                            id="normal-switch"
                            uncheckedIcon={<></>}
                        />
                    </div>


                    {isHomeCharging && <>
                        <div className="row">
                            <div className="item-name">Supply energy while battery is over
                                <div className={"desc"}>Disconnect from home when battery reaches this level</div>
                            </div>
                            <div className="item-value">{minBattery}%</div>
                            <i className={`chevron-right ${showMinBattery ? 'open' : 'close'}`} onClick={() => setShowMinBattery(!showMinBattery)}></i>
                        </div>

                        {showMinBattery && <div className={"battery-max-wrapper"}>
                            <SuperSimple values={[minBattery]} setValue={setMinBattery}/>
                        </div>}
                    </>}
                </div>


            </div>

        </div>
    );

};

export default Status;