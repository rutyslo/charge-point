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
const longTermParking = {

    get: function(){
        return cpList;
    },
    start:  function () {
        console.log("START");
        cpList = [];
        for (let index = 0; index < cpLength; index++) {
            cpList.push({stationId: index + 1, status: 0, connectorType: 'J1772', totalChargeCycle: 0, totalDisChargeCycle: 0});
        }
        console.log('cpList', cpList);
    },
    init: function() {
        dateNow = moment();
        let timesRun = 0;
        let interval = setInterval(function() {
            if(timesRun >= cpLength) {
                clearInterval(interval);
            }
            else {
                //const leaveTime = moment().add(getRandomArbitrary(1, 8), 'day');
                const leaveTime = moment().add(carList[timesRun], 'day').add(getRandomArbitrary(0, 23),'hour')
                    .add(getRandomArbitrary(0, 59),'minute');
                cpList[timesRun].status = 1;
                cpList[timesRun].licensePlate = new RandExp(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/).gen();
                cpList[timesRun].currentBattery = Math.ceil(getRandomArbitrary(5, 30)/5)*5;
                cpList[timesRun].maxBattery = batteryMaxList[getRandomArbitrary(0, 3)];
                cpList[timesRun].leaveTime = leaveTime.format('MM-DD-YYYY HH:mm');
                cpList[timesRun].arrivalTime = moment().valueOf();
                cpList[timesRun].arrivalTimeFormat = moment().format();
                cpList[timesRun].offsetTime = Math.ceil((leaveTime.valueOf() - cpList[timesRun].arrivalTime) / 1000) / 60 / 60 ;
                timesRun++;
            }

        }, 2000);
    },
    tick: function (cent) {
        tickInterval++;
        dateNow.add(0.5, 'hour');
        const isCharged = cent <= 10;
        let isRemoveList = [];
        for (let index = 0; index < cpLength; index++) {
            cpList[index].offsetTime -= 0.5;
            if (cpList[index].offsetTime <= 0) {
                isRemoveList.push(index);
                continue;
            }
            if (isCharged) {
                if (cpList[index].currentBattery < cpList[index].maxBattery) {
                    cpList[index].status = 1;
                    cpList[index].currentBattery += 5;
                    cpList[index].totalChargeCycle += 1;
                } else {
                    cpList[index].status = 0;
                }
            } else {
                if (cpList[index].offsetTime < 12) {
                    cpList[index].status = 0;
                } else if (cpList[index].currentBattery > 30 ) {
                    cpList[index].status = 2;
                    cpList[index].totalDisChargeCycle += 1;
                    cpList[index].currentBattery -= 5;
                } else {
                    cpList[index].status = 0;
                }
            }


        }

        for (let index = 0; index < isRemoveList.length; index++) {
            let cp = cpList[isRemoveList[index]];
            cpList[isRemoveList[index]] = {
                stationId: cp.stationId,
                status: 0,
                connectorType: cp.connectorType,
                totalChargeCycle: cp.totalChargeCycle,
                totalDisChargeCycle: cp.totalDisChargeCycle
            };
        }
        cpLength = cpList.length;
    },
    getDate: function() {
        return dateNow.format('MM-DD-YYYY HH:mm');
    }

};
module.exports = longTermParking;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}