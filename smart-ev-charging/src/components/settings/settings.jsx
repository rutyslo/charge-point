import React from 'react';
import './settings.scss';
import CarDetail from "./car-detail/car-detail";
import carImg1 from './../../assets/images/car-img-1.png';
import carImg2 from './../../assets/images/car-img-2.png';
import carImg1Small from './../../assets/images/small_car.png';

function Settings() {


    const carList = [{id: 1, name : `Mom's car`, type : 'VOLKSWAGEN iD.3', image : carImg1, smallImg: carImg1Small, batteryTime: 220},
                     {id: 2, name : `Dad's car`, type : 'Kia Ev6', image : carImg2, smallImg: carImg1Small, batteryTime: 166}]

    const properties  = { my_charging_station  : [ { key : 'Address', value : '1938 Fairburn Ave. L.A. California 12345-1234'},
                                      { key : 'Operator', value : 'California Energy'}],
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
                {carList.map(car => {
                    return <CarDetail key={car.name} car={car} />
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

}


export default Settings;