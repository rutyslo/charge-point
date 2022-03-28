const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 7000 });

let counter = 0;
let isPower = true;
let price = 10;
let autoToggle = true;

const costs = [12,12,12,12,12,12,12,11,11,10,10,9,9,10,10,11,12,12,12,11,12,12,11,10,9,9,9,9,10,11,12];
const STEVE_URL = "http://135.76.94.163:8080/steve/rest/operations/v1.6/";

    wss.on('connection', ws => {

    console.log(`Connection`);
    ws.send(JSON.stringify({isPower: true, cent : 12}));

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

        setInterval(() => {

            if (autoToggle) {
                if (counter > 30) {
                    counter = 0;
                    console.log(`counter : => 0`);
                }

                const cent = costs[counter];
                console.log(`Send message cent : => ${cent}`);
                wss.clients.forEach(function (client) {
                    client.send(JSON.stringify({isPower: isPower, cent: cent}));
                });

                counter++;
            } else {
                wss.clients.forEach(function (client) {
                    client.send(JSON.stringify({isPower: isPower, cent: price}));
                });
            }
        }, 10000);

});

const express = require('express');
const app = express();
const cors = require("cors");
const axios = require("axios");

const whitelist = ["http://iltlvmac0171.intl.att.com:3001"]
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

const port = 4000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);