import React, {memo, useState} from 'react';
import Switch from "react-switch";
import axios from "axios";
import './electric-region.scss';
import {ReactComponent as Icon} from "../../assets/images/power-outage.svg";


const ElectricRegion = memo(({props}) => {

    const [isPowerToggle, setIsPowerToggle] = useState(true);

    const sendIsPower = () => {
        axios.post('http://localhost:4000/power', { isPower : !isPowerToggle })
            .then(response => {
                setIsPowerToggle(response.data.isPower);
            });
    }

    return (
        <div className={"electric-wrapper"}>
            <div className={"is-power-toggle"}>
                <span className={"label"}>Electricity:</span>
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
            <div className={`power-out-wrapper ${isPowerToggle.toString()}`}>
                <Icon className={'icon'}/>
                Power Outage
            </div>
        </div>
    )
});

export default ElectricRegion;