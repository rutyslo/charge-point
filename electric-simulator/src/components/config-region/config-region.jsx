import React, {memo, useState} from 'react';
import Switch from "react-switch";
import axios from "axios";
import './config-region.scss';

//const BE_URL = 'http://iltlvmac0171.intl.att.com:4000';
const BE_URL = 'http://20.230.116.80:4000';

const ConfigRegion = memo(({props}) => {

    const [isCpToggle, setIsPowerToggle] = useState(true);
    const [isCollapse, setIsCollapse] = useState(false);

    const sendIsCPDemo = () => {
        axios.post(`${BE_URL}/is-cp`, { isCpToggle : !isCpToggle })
            .then(response => {
                setIsPowerToggle(response.data.isCpToggle);
            });
    }

    return (
        <div className={"config-wrapper"}>
            <div className={"is-cp-toggle"}>
                <span className={"label"} onClick={()=> setIsCollapse(!isCollapse)}>Configuration {isCollapse ? '-' : '+'} </span>
                {isCollapse ? <div className={"toggle-wrapper"}>
                    <span className={"toggle"}>{isCpToggle ? 'CP' : 'Parking'}</span>
                    <Switch
                        key={1}
                        width={60}
                        checked={isCpToggle}
                        onChange={sendIsCPDemo}
                        className="switch-is-smart react-switch"
                        onColor="#0057B8"
                        id="normal-switch"
                        uncheckedIcon={<></>}
                    />
                </div> : <></>}

            </div>
        </div>
    )
});

export default ConfigRegion;