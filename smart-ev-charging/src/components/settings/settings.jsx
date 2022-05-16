import React, {useEffect} from 'react';
import './settings.scss';
import CarDetail from "./car-detail/car-detail";
import {observer} from "mobx-react-lite";
import appState from "../../app.state";

const Settings = observer((props) => {

    const properties  = { my_charging_station  : [ { key : 'Address', value : '1938 Fairburn Ave. Minneapolis, MN'},
                                      { key : 'Operator', value : 'Minnesota Energy'}],
                         billing : [  { key : 'Paying method', value : 'AT&T Card'},
                                      { key : 'Billing History', value : ''}]
    }

    return (
        <div className="setting-wrapper">
            <div className="header">
                <div className="title">
                    CARS
                </div>
                <div className="add-new-car">
                    + Add a Car
                </div>
            </div>
            <div className="car-detail-wrapper">
                {appState.carList.map((car, index) => {
                    return <CarDetail key={car.name} index={index} carIndex={index} isPower={props.isPower} electric={props.electric}/>
                })}
            </div>
            {
                Object.keys(properties).map(function(keyName, keyIndex) {
                    return (
                        <div key={keyIndex} className="prop-wrapper">
                            <div key={keyIndex} className="title-row">{keyName.replaceAll('_', ' ')}</div>
                            {
                                properties[keyName].map(item => {
                                    return <div key={item.key} className="row">
                                                <div className="item-name">{item.key}</div>
                                                <div className="item-value">{item.value}</div>
                                                <i className="chevron-right"></i>
                                            </div>
                                })
                            }
                        </div>)
            })
            }
        </div>
    );

});


export default Settings;