const RandExp = require("randexp");
const moment = require("moment");
const carDetail = {};
// STOP = 0, CHARGING = 1 , DISCHARGING = 2
const connectorType = ['J1772'];
const carList = [2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8];
let cpLength = 16;
let cpList =  [];
const batteryMaxList = [80,85,90,95];
let dateNow;
let tickInterval = 0;
let newIndex = 0;
let removeIndex = 0;
let currentIndex = -1;
const limitConsumption = 200;
let currentConsumption = 0;
let isSimulatorPlay = false;
const longTermParking = {

    get: function(){
        return cpList;
    },
    start: function () {
        console.log("START");
        dateNow = moment().startOf('day').add(6, 'hour');
        tickInterval = 0;
        newIndex = 0;
        removeIndex = 0;
        currentIndex = -1;
        cpList = [];
        cpLength = 16;
        currentConsumption = 0;
        for (let timesRun = 0; timesRun < cpLength; timesRun++) {
                cpList[timesRun] = {stationId: timesRun + 1, status: 0, connectorType: 'J1772'};
                if (timesRun >= 14) {
                    continue;
                }
                //const leaveTime = moment().add(getRandomArbitrary(1, 8), 'day');
                const leaveTime = moment().add(carList[timesRun], 'day').add(getRandomArbitrary(0, 23),'hour')
                    .add(getRandomArbitrary(0, 59),'minute');
                cpList[timesRun].status = 3;
                cpList[timesRun].licensePlate = new RandExp(/^[0-9]{1}[A-Z]{3}[0-9]{3}$/).gen();
                if (timesRun != 3 && timesRun !== 6 && timesRun !== 11) {
                    cpList[timesRun].attuid = new RandExp(/^[0-9]{9}$/).gen();
                }
                cpList[timesRun].currentBattery = Math.ceil(getRandomArbitrary(10, 70)/5)*5;
                cpList[timesRun].maxBattery = 80;
                cpList[timesRun].leaveTime = leaveTime.format('MM-DD-YYYY HH:mm');
                cpList[timesRun].arrivalTime = dateNow.valueOf();
                cpList[timesRun].arrivalTimeFormat = dateNow.format();
                cpList[timesRun].offsetTime = Math.ceil((leaveTime.valueOf() - cpList[timesRun].arrivalTime) / 1000) / 60 / 60;
                cpList[timesRun].estimatedCycles = Math.round(cpList[timesRun].offsetTime / 12);
                if (leaveTime.hour() >= 17) {
                    //cpList[timesRun].estimatedCycles-=1;
                } else {
                    cpList[timesRun].estimatedCycles+=1;
                }
                cpList[timesRun].estimatedCycles = Math.round(cpList[timesRun].estimatedCycles / 2);
                cpList[timesRun].currentCycle = 0;
                cpList[timesRun].isNewCycle = true;
        }
        console.log('cpList', cpList);
    },
    init: function() {

        dateNow = moment().startOf('day').add(6, 'hour');
        let timesRun = 14;
        let interval = setInterval(function() {
            if(timesRun >= cpLength) {
                clearInterval(interval);
                newIndex = 0;
            }
            else {
                if (isSimulatorPlay) {
                    //const leaveTime = moment().add(getRandomArbitrary(1, 8), 'day');
                    const leaveTime = moment().add(carList[timesRun], 'day').add(getRandomArbitrary(0, 23),'hour')
                        .add(getRandomArbitrary(0, 59),'minute');
                    //cpList[timesRun].status = 1;
                    cpList[timesRun].licensePlate = new RandExp(/^[0-9]{1}[A-Z]{3}[0-9]{3}$/).gen();
                    if (timesRun != 3 && timesRun !== 6 && timesRun !== 11) {
                        cpList[timesRun].attuid = new RandExp(/^[0-9]{9}$/).gen();
                    }
                    cpList[timesRun].currentBattery = Math.ceil(getRandomArbitrary(10, 70)/5)*5;
                    cpList[timesRun].maxBattery = batteryMaxList[getRandomArbitrary(0, 3)];
                    cpList[timesRun].leaveTime = leaveTime.format('MM-DD-YYYY HH:mm');
                    cpList[timesRun].arrivalTime = dateNow.valueOf();
                    cpList[timesRun].arrivalTimeFormat = dateNow.format();
                    cpList[timesRun].offsetTime = Math.ceil((leaveTime.valueOf() - cpList[timesRun].arrivalTime) / 1000) / 60 / 60;
                    cpList[timesRun].estimatedCycles = Math.round(cpList[timesRun].offsetTime / 12);
                    if (leaveTime.hour() >= 17) {
                        //cpList[timesRun].estimatedCycles-=1;
                    } else {
                        cpList[timesRun].estimatedCycles+=1;
                    }
                    cpList[timesRun].estimatedCycles = Math.round(cpList[timesRun].estimatedCycles / 2);
                    cpList[timesRun].currentCycle = 0;
                    cpList[timesRun].isNewCycle = true;
                    timesRun++;
                    if (timesRun <= 16 ) {
                        newIndex = timesRun;
                    }
                }

            }

        }, 4000);
    },
    tick: function (centPrice, lowPrice, highPrice, isNewCycle) {
        tickInterval++;
        dateNow.add(0.5, 'hour');
        let chargeList = [];
        let disChargeList = [];
        let statusCharging = 0;
        if (centPrice <= lowPrice) {
            statusCharging = 1;
        } else if (centPrice >= highPrice) {
            statusCharging = 2;
        }
        let isRemoveList = [];
        removeIndex = 0;
        for (let index = 0; index < cpLength; index++) {
            cpList[index].offsetTime -= 0.5;
            if (cpList[index].offsetTime <= 0) {
                isRemoveList.push(index);
                continue;
            }
            if (!statusCharging && (cpList[index].offsetTime < 8)) {
                if (cpList[index].currentBattery < cpList[index].maxBattery) {
                    chargeList.push(index);
                    cpList[index].status = 1;
                    continue;
                } else {
                    cpList[index].status = 4;
                    continue;
                }
            }
            if (statusCharging === 1) {
                if (cpList[index].offsetTime < 8) {
                    if (cpList[index].currentBattery < cpList[index].maxBattery) {
                        chargeList.push(index);
                        cpList[index].status = 1;
                        if (isNewCycle || cpList[index].isNewCycle) {
                            cpList[index].currentCycle += 1;
                            cpList[index].isNewCycle = false;
                        }
                        //cpList[index].currentBattery += 5;
                    } else {
                        cpList[index].status = 4;
                    }
                } else if (cpList[index].currentBattery < cpList[index].maxBattery) {
                    cpList[index].status = 1;
                    //cpList[index].currentBattery += 5;
                    chargeList.push(index);
                    if (isNewCycle || cpList[index].isNewCycle) {
                        cpList[index].currentCycle += 1;
                        cpList[index].isNewCycle = false;
                    }
                } else if (cpList[index].licensePlate) {
                    cpList[index].status = 3;
                }
            } else if (statusCharging === 2) {
                if (cpList[index].offsetTime < 12) {
                    cpList[index].status = 4;
                } else if (cpList[index].currentBattery > 30 ) {
                    cpList[index].status = 2;
                    // cpList[index].currentBattery -= 5;
                    disChargeList.push(index);
                    if (isNewCycle && cpList[index].isNewCycle) {
                        cpList[index].currentCycle += 1;
                        cpList[index].isNewCycle = false;
                    }
                } else if (cpList[index].licensePlate) {
                    cpList[index].status = 3;
                }
            } else {
                if (cpList[index].licensePlate) {
                    cpList[index].status = 3;
                }
            }
        }

        let walt = 10;
        if (statusCharging === 1 || chargeList.length > 0) {
            if (chargeList.length > 10) {
                walt = (limitConsumption / chargeList.length / 2);
                walt = Math.round(walt * 10) / 10;
                console.log('walt', walt)
            }
            for (let index = 0; index < chargeList.length; index++) {
                if ((cpList[chargeList[index]].currentBattery + walt) > cpList[chargeList[index]].maxBattery) {
                    cpList[chargeList[index]].currentBattery = cpList[chargeList[index]].maxBattery;
                } else {
                    cpList[chargeList[index]].currentBattery += walt;
                    cpList[chargeList[index]].currentBattery = Math.round(cpList[chargeList[index]].currentBattery * 10) / 10;
                    //cpList[chargeList[index]].currentBattery = parseFloat(cpList[chargeList[index]].currentBattery).toFixed(1);
                }
            }
            currentConsumption = walt * chargeList.length  * 2;
        }  else if (statusCharging === 2) {
            if (disChargeList.length > 10) {
                walt = (limitConsumption / disChargeList.length / 2);
                walt = Math.round(walt * 10) / 10;
                console.log('walt', walt)
            }
            for (let index = 0; index < disChargeList.length; index++) {
                if ((cpList[disChargeList[index]].currentBattery - walt) >= 30) {
                    cpList[disChargeList[index]].currentBattery -= walt;
                    //cpList[disChargeList[index]].currentBattery = parseFloat((cpList[disChargeList[index]].currentBattery).toFixed(1));
                    cpList[disChargeList[index]].currentBattery = Math.round(cpList[disChargeList[index]].currentBattery * 10) / 10;
                } else {
                    cpList[disChargeList[index]].currentBattery = 30;
                }

            }
            currentConsumption = walt * disChargeList.length * 2;
        } else {
            currentConsumption = 0;
        }

        for (let index = 0; index < isRemoveList.length; index++) {
            let cp = cpList[isRemoveList[index]];
            cpList[isRemoveList[index]] = {
                stationId: cp.stationId,
                status: 0,
                connectorType: cp.connectorType
            };
            removeIndex = isRemoveList[index] + 1;
        }
        cpLength = cpList.length;
    },
    getDate: function() {
        return dateNow.format('MM-DD-YYYY HH:mm');
    },
    getNewIndex: function() {
        return newIndex;
    },
    setNewIndex: function(newInx) {
        newIndex = newInx;
    },
    getRemoveIndex: function() {
        return removeIndex;
    },
    getCurrentIndex: function() {
        return currentIndex;
    },
    setCurrentIndex: function(current) {
        currentIndex = current;
    },
    getCurrentConsumption: function() {
        return currentConsumption;
    },
    getIsSimulatorPlay: function() {
        return isSimulatorPlay;
    },
    setIsSimulatorPlay: function(toggle) {
        isSimulatorPlay = toggle;
    },

};
module.exports = longTermParking;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}