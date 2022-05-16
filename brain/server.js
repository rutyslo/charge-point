const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 7000 });
const longTermParking = require('./LongTermParking');

let counter = 0;
let isPower = true;
let price = 9;
let centPrice = 8;
let highPrice = 20;
let lowPrice = 8;
let autoToggle = true;
const hourStart = 6;
let hourDay = hourStart;
let hourIndex = 0;
longTermParking.start();
const costs = [11,11,12,12,12,12,11,11,11,11,10,10,10,9,9,10,10,9,9,10];
const morning = [9,10, 11,12, 13,14, 14,15, 16,17, 15,16, 17,18, 16,15, 14,15, 16,17, 18,19];
const afternoon = [20,21, 21,22, 21,22, 21,20];
const evening = [19,18, 19,17, 15,12];
const night = [10,8, 7,6, 5,5, 5,5, 6,6, 7,8];
let apiPrice;
let apiIsPower;
let currentStatus = '';
let batteryLevel = 55;

const allDay = morning.concat(afternoon).concat(evening).concat(night);
const STEVE_URL = "http://135.76.132.224:8080/steve/rest/operations/v1.6/";

    wss.on('connection', ws => {
        console.log(`Connection`);
        console.log(`Send message cent : =>  ${allDay[hourIndex]} , hour : ${hourDay} `);
        apiPrice = allDay[hourIndex];
        apiIsPower = true;
        ws.send(JSON.stringify({type: "electricity", value: {isPower: true, cent : allDay[hourIndex], highPrice: highPrice, lowPrice, batteryLevel: batteryLevel}}));
        wss.clients.forEach(function (client) {
            client.send(JSON.stringify({type: "logTermParking" , value : {
                    currentIndex: longTermParking.getCurrentIndex(),
                    currentConsumption: longTermParking.getCurrentConsumption(),
                    newIndex: longTermParking.getNewIndex(),
                    removeIndex: longTermParking.getRemoveIndex(),
                    dateNow: longTermParking.getDate(),
                    cpList : longTermParking.get() }}));
        });

        //hourDay+=0.5;


    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        try{
            const object = JSON.parse(message);
            currentStatus = object["ChargeNotification"] ? 'StartCharging' : 'StopCharging';
        } catch (err) {
            console.log('Error: ', err.message);
        }
        // try {
        //     const object = JSON.parse(message);
        //     const url = object["ChargeNotification"] ? 'RemoteStartTransaction' : 'RemoteStopTransaction';
        //     console.log(`url => ${url}`);
        //     axios.post(STEVE_URL + url, {
        //         "chargePointId": "CP01",
        //         "connectorId": 1,
        //         "idTag": "tag1"
        //     }).then(response => {
        //         console.log("Charging response status", response.status)
        //     });
        //
        // } catch (err) {
        //     console.log('Error: ', err.message);
        // }
    });


    });
let isNewCycle = false;
let prevCycle = false;

let demoName = 'cp';
let interval = 3000;

const timer = setInterval(() => {

    if (autoToggle && (longTermParking.getIsSimulatorPlay() || demoName === 'cp')) {
        // FOR First DEmo
        if (demoName === 'cp' && counter >= costs.length) {
            counter = 0;
            console.log(`counter : => 0`);
        }

        if (demoName === 'parking') {
            centPrice = allDay[hourIndex];
        } else {
            centPrice = costs[counter];
        }

        apiPrice = centPrice;
        apiIsPower = isPower;
        wss.clients.forEach(function (client) {
            client.send(JSON.stringify({type: "electricity", value: {isPower: isPower, cent: centPrice , highPrice: highPrice, lowPrice: lowPrice, batteryLevel: batteryLevel}}));
        });

        isNewCycle = hourDay === 17 || hourDay === 24.5;
        console.log(`Send message cent : =>  ${centPrice} , hour : ${hourDay} isNewCycle: ${isNewCycle} prevCycle: ${prevCycle}`);

        // if (hourDay === 19) {
        //     longTermParking.earlierPickup();
        // }

        if (longTermParking.getIsSimulatorPlay()) {
            longTermParking.tick(centPrice, lowPrice, highPrice, prevCycle === false && isNewCycle === true);
        }

        // if (hourDay === 19) {
        //     longTermParking.setIsSimulatorPlay(false);
        // }

        wss.clients.forEach(function (client) {
            client.send(JSON.stringify({type: "logTermParking" , value : {
                    currentIndex: longTermParking.getCurrentIndex(),
                    currentConsumption: longTermParking.getCurrentConsumption(),
                    isPlay: longTermParking.getIsSimulatorPlay(),
                    newIndex: longTermParking.getNewIndex(),
                    removeIndex: longTermParking.getRemoveIndex(),
                    dateNow: longTermParking.getDate(),
                    cpList : longTermParking.get() }}));
        });
        if (longTermParking.getIsSimulatorPlay()) {
            hourDay+= 0.5;
            hourIndex++;
            prevCycle = isNewCycle;
        }

        if (hourIndex >= 48) {
            hourDay = hourStart;
            hourIndex = 0;
        }

        if (demoName === 'cp') {
            counter++;
        }
    } else {
        let rate = allDay[hourIndex];
        if (autoToggle === false) {
            rate = price;
        }
        apiPrice = rate;
        apiIsPower = isPower;
        wss.clients.forEach(function (client) {
            client.send(JSON.stringify({type: "electricity", value: {isPower: isPower, cent: rate, highPrice: highPrice, lowPrice, batteryLevel: batteryLevel}}));
        });
    }
}, interval);

const express = require('express');
const app = express();
const cors = require("cors");
const axios = require("axios");

const whitelist = ["http://iltlvmac0171.intl.att.com:3001", "http://iltlvmac0171.intl.att.com:3002", "http://localhost:3001",
    "http://localhost:3002", "http://20.230.116.80:3001","http://20.230.116.80:3002"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

app.use(express.json());

app.use(cors(corsOptions));

app.post('/power', (req, res) => {
    console.log('power', req.body);
    isPower = req.body.isPower;
    apiIsPower = isPower;
    res.send({ isPower: req.body.isPower });
})

app.post('/is-cp', (req, res) => {
    console.log('is-cp', req.body);
    demoName = req.body.isCpToggle ? 'cp' : 'parking';
    console.log('demoName', demoName);
    if (demoName === 'cp') {
        counter = 0;
        longTermParking.setIsSimulatorPlay(false);
    } else if (demoName === 'parking') {
        console.log('start-long-parking');
        hourDay = 6.5;
        hourIndex = 1;
        longTermParking.start();
        longTermParking.init();
    }
    res.send({isCpToggle : req.body.isCpToggle});
})

app.post('/set-battery-level', (req, res) => {
    console.log('batteryLevel', req.body.batteryLevel);
    batteryLevel = req.body.batteryLevel;
})

app.post('/price', (req, res) => {
    console.log('price', req.body);
    price = req.body.price;
    apiPrice = price;
    res.send({ price: req.body.price });
})

app.post('/auto-toggle', (req, res) => {
    console.log('autoToggle', req.body.autoToggle);
    autoToggle = req.body.autoToggle;
    res.send({ autoToggle: req.body.autoToggle });
})

app.post('/is-simulator-play', (req, res) => {
    console.log('isSimulatorPlay', req.body.isSimulatorPlay);
    longTermParking.setIsSimulatorPlay(req.body.isSimulatorPlay);
    res.send({ isSimulatorPlay: req.body.isSimulatorPlay });
})

app.get('/start-long-parking', (req, res) => {
    console.log('start-long-parking');
    hourDay = 6.5;
    hourIndex = 1;
    longTermParking.setIsSimulatorPlay(true);
    longTermParking.start();
    longTermParking.init();
    res.send({});
})

app.post('/set-current-index', (req, res) => {
    console.log('currentIndex', req.body.currentIndex);
    longTermParking.setCurrentIndex(req.body.currentIndex);
    res.send({ currentIndex: req.body.currentIndex });
})

app.get('/electric-info', (req, res) => {
    res.send({ apiPrice: apiPrice, apiIsPower: apiIsPower});
})

app.get('/current-status', (req, res) => {
    res.send({ currentStatus: currentStatus, apiPrice: apiPrice, apiIsPower: apiIsPower});
})

const port = 4000;
app.listen(port);


// const nodeArgs = process.argv.slice(2);
// demoName = nodeArgs[0];
// console.log('nodeArgs[1]',nodeArgs[1])
// if (demoName === 'cp' && nodeArgs[1]) {
//     interval = parseInt(nodeArgs[1]);
//     console.log('interval', interval);
// }
console.log(`Listening at http://localhost:${port}`);
