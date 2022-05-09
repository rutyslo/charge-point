import React, {memo, useState} from 'react';
import Switch from "react-switch";
import axios from "axios";
import './electric-region.scss';
import {ReactComponent as Icon} from "../../assets/images/power-outage.svg";

const BE_URL = 'http://localhost:4000';

const ElectricRegion = memo(({props}) => {

    const [isPowerToggle, setIsPowerToggle] = useState(true);
    const [isAutoToggle, setIsAutoToggle] = useState(true);
    const [price, setPrice] = useState(true);

    const sendIsPower = () => {
        axios.get(`${BE_URL}/tesla`)
            .then(res => {
               console.log('res', res)
            }).catch(res => {
            console.log('error', res)
        })

        axios.post(`${BE_URL}/power`, { isPower : !isPowerToggle })
            .then(response => {
                setIsPowerToggle(response.data.isPower);
            });
    }

    const sendPrice = () => {
        if (!isAutoToggle) {
            axios.post(`${BE_URL}/price`, { price : price })
                .then(response => {

                });
        }
    }

    const sendAutoToggle = () => {
        axios.post(`${BE_URL}/auto-toggle`, { autoToggle : !isAutoToggle })
            .then(response => {
                setIsAutoToggle(response.data.autoToggle);
            });
    }

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    }

    return (
        <div className={"electric-wrapper"}>
            <div className={"is-power-toggle"}>
                <span className={"label"}>Electricity:</span>
                <div className={"toggle-wrapper"}>
                    <span className={"toggle"}>{isPowerToggle ? 'ON' : 'OFF'}</span>
                    <Switch
                        key={1}
                        width={60}
                        checked={isPowerToggle}
                        onChange={sendIsPower}
                        className="switch-is-smart react-switch"
                        onColor="#0057B8"
                        id="normal-switch"
                        uncheckedIcon={<></>}
                    />
                </div>

            </div>
            <div className={"auto-actions"}>
                <div className="auto-price-wrapper">
                    <span className={"label"}>Auto Price:</span>
                    <div className={"toggle-wrapper"}>
                        <span className={"toggle"}>{isAutoToggle ? 'ON' : 'OFF'}</span>
                        <Switch
                            key={2}
                            width={60}
                            checked={isAutoToggle}
                            onChange={sendAutoToggle}
                            className="switch-is-smart react-switch"
                            onColor="#0057B8"
                            id="normal-switch"
                            uncheckedIcon={<></>}
                        />
                    </div>

                </div>
                <div className={`set-price-wrapper ${isAutoToggle ? 'auto-toggle' : 'not-auto-toggle'}`}
                     aria-disabled={!isAutoToggle}>
                    <span className={"label"}>Set price to:</span>
                    <div className={'set-wrapper'}>
                        <input type={'number'} step={1} name='price' min={6} max={18}
                               onChange={(event) => onChangePrice(event)}
                               value={price}
                        />
                        <span className={"set-value"} onClick={sendPrice}>Set</span>
                    </div>
                </div>
            </div>

            <div className={`power-out-wrapper ${isPowerToggle.toString()}`}>
                <Icon className={'icon'}/>
                Power Outage
            </div>
        </div>
    )
});

export default ElectricRegion;