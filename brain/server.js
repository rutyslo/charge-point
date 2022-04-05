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
let isSimulatorPlay = true;
const hourStart = 6;
let hourDay = hourStart;
let hourIndex = 0;
longTermParking.start();
longTermParking.init();
//const costs = [12,12,12,12,12,12,12,11,11,10,10,9,9,10,10,11,12,12,12,11,12,12,11,10,9,9,9,9,10,11,12];
const morning = [9,10, 11,12, 13,14, 14,15, 16,17, 15,16, 17,18, 16,15, 14,15, 16,17, 18,19];
const afternoon = [20,21, 21,22, 21,22, 21,20];
const evening = [19,18, 19,17, 15,12];
const night = [10,8, 7,6, 5,5, 5,5, 6,6, 7,8];

const allDay = morning.concat(afternoon).concat(evening).concat(night);
const STEVE_URL = "http://135.76.132.224:8080/steve/rest/operations/v1.6/";

    wss.on('connection', ws => {
        console.log(`Connection`);
        console.log(`Send message cent : =>  ${allDay[hourIndex]} , hour : ${hourDay} `);
        ws.send(JSON.stringify({type: "electricity", value: {isPower: true, cent : allDay[hourIndex++], highPrice: highPrice, lowPrice, lowPrice}}));
        hourDay+=0.5;


    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        try {
            const object = JSON.parse(message);
            const url = object["ChargeNotification"] ? 'RemoteStartTransaction' : 'RemoteStopTransaction';
            console.log(`url => ${url}`);
            axios.post(STEVE_URL + url, {
                "chargePointId": "CP01",
                "connectorId": 1,
                "idTag": "tag1"
            }).then(response => {
                console.log("Charging response status", response.status)
            });

        } catch (err) {
            console.log('Error: ', err.message);
        }
    });

        let isNewCycle = false;
        let prevCycle = false;

        setInterval(() => {

            if (autoToggle && isSimulatorPlay) {
                // FOR First DEmo
                // if (counter > 30) {
                //     counter = 0;
                //     console.log(`counter : => 0`);
                // }

                centPrice = allDay[hourIndex++];

                wss.clients.forEach(function (client) {
                    client.send(JSON.stringify({type: "electricity", value: {isPower: isPower, cent: centPrice , highPrice: highPrice, lowPrice, lowPrice}}));
                });
                isNewCycle = ((hourDay >= 17) && (hourDay <= 21)) || ((hourDay >= 24.5)  && (hourDay < 30));
                console.log(`Send message cent : =>  ${centPrice} , hour : ${hourDay} isNewCycle: ${isNewCycle} prevCycle: ${prevCycle}`);

                longTermParking.tick(centPrice, lowPrice, highPrice, prevCycle === false && isNewCycle === true);
                wss.clients.forEach(function (client) {
                    client.send(JSON.stringify({type: "logTermParking" , value : {
                            currentIndex: longTermParking.getCurrentIndex(),
                            currentConsumption: longTermParking.getCurrentConsumption(),
                            newIndex: longTermParking.getNewIndex(),
                            removeIndex: longTermParking.getRemoveIndex(),
                            dateNow: longTermParking.getDate(),
                            cpList : longTermParking.get() }}));
                });
                hourDay+= 0.5;
                prevCycle = isNewCycle;
                if (hourIndex >= 48) {
                    hourDay = hourStart;
                    hourIndex = 0;
                }

                //counter++;
            } else {
                wss.clients.forEach(function (client) {
                    client.send(JSON.stringify({type: "electricity", value: {isPower: isPower, cent: price, highPrice: highPrice, lowPrice, lowPrice}}));
                });
            }
        }, 2000);

        // setInterval(() => {
        //     if (isSimulatorPlay) {
        //         const tariff = hourDay > 12 ? 11 : 8;
        //         const isNewCycle = hourDay % 12 === 0;
        //         longTermParking.tick(tariff, isNewCycle);
        //         wss.clients.forEach(function (client) {
        //             client.send(JSON.stringify({type: "logTermParking" , value : {
        //                     currentIndex: longTermParking.getCurrentIndex(),
        //                     newIndex: longTermParking.getNewIndex(),
        //                     removeIndex: longTermParking.getRemoveIndex(),
        //                     dateNow: longTermParking.getDate(),
        //                     cpList : longTermParking.get() }}));
        //         });
        //         hourDay+= 0.5;
        //         if (hourDay >= 24) {
        //             hourDay = 0;
        //         }
        //     }
        // }, 2000);

});

const express = require('express');
const app = express();
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");

const whitelist = ["http://iltlvmac0171.intl.att.com:3001", "http://iltlvmac0171.intl.att.com:3002", "http://localhost:3001","http://localhost:3002"]
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
    res.send({ isPower: req.body.isPower });
})

app.post('/price', (req, res) => {
    console.log('price', req.body);
    price = req.body.price;
    res.send({ price: req.body.price });
})

app.post('/auto-toggle', (req, res) => {
    console.log('autoToggle', req.body.autoToggle);
    autoToggle = req.body.autoToggle;
    res.send({ autoToggle: req.body.autoToggle });
})

app.post('/is-simulator-play', (req, res) => {
    console.log('isSimulatorPlay', req.body.isSimulatorPlay);
    isSimulatorPlay = req.body.isSimulatorPlay;
    res.send({ isSimulatorPlay: req.body.isSimulatorPlay });
})

app.get('/start-long-parking', (req, res) => {
    console.log('start-long-parking');
    longTermParking.start();
    longTermParking.init();
    res.send({});
})

app.post('/set-current-index', (req, res) => {
    console.log('currentIndex', req.body.currentIndex);
    longTermParking.setCurrentIndex(req.body.currentIndex);
    res.send({ currentIndex: req.body.currentIndex });
})

const port = 4000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
