import axios from "axios";
import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput
} from "react-native";
import CryptoJS  from "crypto-js";
import { WebView } from 'react-native-webview';
import CheckBox from '@react-native-community/checkbox';

const BE_URL = "http://20.230.116.80";
//const BE_URL = "http://10.0.2.2";

export default function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [chargeStatus, setChargeStatus] = useState(null);

    const [vehicleId, setVehicleId] = useState(null);
    const [batteryLevel, setBatteryLevel] = useState(null);

    const [cent, setCent] = useState(null);
    const [isPower, setIsPower] = useState(null);

    const [threshold, setThreshold] = useState(10);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [isTimeLeft, setIsTimeLeft] = useState(false)

    let prevStatus = null;

    const generateCodeVerifier = () => {
        let result           = '';
        let characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let charactersLength = characters.length;
        for ( let i = 0; i < 86; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function base64URL(string) {
        return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    }
    const generateCodeChallenge = (code_verifier) => {
        return base64URL(CryptoJS.SHA256(code_verifier))
    }
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const url = `https://auth.tesla.com/oauth2/v3/authorize?` +
        `client_id=ownerapi&code_challenge=${codeChallenge}&code_challenge_method=S256&redirect_uri=https://auth.tesla.com/void/callback&response_type=code&` +
        `scope=openid email offline_access&state=${generateCodeChallenge(generateCodeVerifier())}`;

    const convertUrlParams = (url) => {
        let regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params;
    };

    const fetchPowerInfo = () => {

            axios.get(`${BE_URL}:4000/current-status`)
                .then(res => {
                    console.log('res', res.data)
                    const currentStatus = res.data.currentStatus;
                    const apiPrice = parseInt(res.data.apiPrice);
                    const apiIsPower = Boolean(res.data.apiIsPower);
                    setCent(apiPrice);
                    setIsPower(apiIsPower);

                    if (currentStatus !== prevStatus) {
                        if (currentStatus === 'StartCharging') {
                            console.log("START CHARGING");
                            // SEND START CHARGING
                            startCharging();
                        } else if (currentStatus === 'StopCharging') {
                            console.log("STOP CHARGING");
                            // SEND STOP CHARGING
                            stopCharging();
                        }
                        prevStatus = res.data.currentStatus;
                    }

                }).catch((err) => console.log("err-status", err))


    }
    let interval;

    useEffect(() => {
        console.log('toggleCheckBox', toggleCheckBox)
        if (toggleCheckBox) {
            interval = setInterval(() => {
                fetchPowerInfo()
            }, 1000);
        } else {
            console.log('clearInterval')
            clearInterval(interval);
            //interval = undefined
        }
        return () => {
            clearInterval(interval);
        }
    }, [toggleCheckBox, isTimeLeft]);


    const startCharging = () => {
        console.log("startCharging");
        axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/charge_start`,
            {}, { headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json; charset=utf-8' } })
            .then(res => {
                console.log("startCharging", res.data.response);
                if (isTimeLeft) {
                    axios.get(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/charge_state`,
                        { headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json; charset=utf-8' } })
                        .then(result => {
                            console.log("battery", result.data.response);
                            setBatteryLevel(result.data.response.battery_level);
                            axios.post(`${BE_URL}:4000/set-battery-level`, {
                                timeToFullCharge: result.data.response.time_to_full_charge,
                                batteryLevel: result.data.response.battery_level
                            })
                                .then((response => {
                                    console.log('set-battery-level', response);
                                }))

                            setChargeStatus(result.data.response.charging_state);
                        }).catch(err => {
                        console.log("err-battery", err)
                        if (err.status === 401) {
                            setAccessToken(null);
                        }
                    })
                }
            }).catch(err => console.log("err-startCharging", err))
    }

    const stopCharging = () => {
        console.log("stopCharging");
        axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/charge_stop`,
            {}, { headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json; charset=utf-8' } })
            .then(res => {
                console.log("stopCharging", res.data.response);
            }).catch(err => console.log("err-stopCharging", err))
    }

    const getBatteryLevel = () => {
        console.log("accessToken", accessToken);
        console.log("vehicleId", vehicleId);


        axios.get(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/charge_state`,
            { headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json; charset=utf-8' } })
            .then(res => {
                console.log("battery", res.data.response);
                setBatteryLevel(res.data.response.battery_level);
                axios.post(`${BE_URL}:4000/set-battery-level`, {
                    batteryLevel: res.data.response.battery_level}).then((result => {
                        console.log('set-battery-level', result);
                }))

                setChargeStatus(res.data.response.charging_state);
            }).catch(err => {
                console.log("err-battery", err)
                if (err.status === 401) {
                    setAccessToken( null );
                }
            })
        axios.get(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/vehicle_state`,
            { headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json; charset=utf-8' } })
            .then(res => {
                console.log("vehicle_state", res.data.response);
            }).catch(err => console.log("err-vehicle_state", err))
    }

    const callToRefreshToken = () => {
        axios.post("https://auth.tesla.com/oauth2/v3/token", {
            "grant_type": "refresh_token",
            "refresh_token": refreshToken,
            "client_id": "ownerapi",
            "client_secret": "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3"
        }).then(result => {
            console.log('refreshToken',result.data);
            setAccessToken(result.data.access_token);
            console.log('result.data.access_token', result.data.access_token)
            setRefreshToken(result.data.refresh_token);
        })
    }

    const loginToTesla = (callbackUrl) => {
        const params = convertUrlParams(callbackUrl);
        axios.post("https://auth.tesla.com/oauth2/v3/token", {
            grant_type: 'authorization_code',
            client_id: 'ownerapi',
            code_verifier: codeVerifier,
            code: params.code,
            redirect_uri: "https://auth.tesla.com/void/callback"
        }, {
            headers: {
                "Accept": "*/*",
                "Content-Type" : "application/json",
                "Connection" : "keep-alive"
            }})
            .then(result => {
                const authToken = result.data.access_token;
                setAccessToken(authToken);
                setRefreshToken(result.data.refresh_token);
                axios.get("https://owner-api.teslamotors.com/api/1/vehicles",
                    { headers: { Authorization: "Bearer " + authToken, 'Content-Type': 'application/json; charset=utf-8' } })
                    .then(res => {
                        const id = res.data.response[0].id_s;
                        setVehicleId(id);
                    }).catch(err => console.log("err-authToken", err))
            });
    }

    const handleSubjectSelect = (value) => {
        setToggleCheckBox(value);
    }

    return (
      <>
          {accessToken === null ?
              <WebView
                  javaScriptCanOpenWindowsAutomatically={true}
                  javaScriptEnabled={true}
                  source={{ uri: url }}
                  onNavigationStateChange={(navState) => {
                  if (navState.title === "Tesla - Error") {
                      loginToTesla(navState.url);
                  }
              }} /> :

              <ScrollView contentContainerStyle={styles.container}>
                 <View>
                     <View style={{margin:20}}>
                         <Button
                             title="Get Charge State"
                             onPress={getBatteryLevel}
                             style={styles.submitButton}
                         />
                     </View>
                     <View style={{margin:20}}>
                         <Button
                             title="Start Charging"
                             onPress={startCharging}
                             style={styles.submitButton}
                         />
                     </View>
                     <View style={{margin:20}}>
                         <Button
                             title="Stop Charging"
                             onPress={stopCharging}
                             style={styles.submitButton}
                         />
                     </View>
                 </View>

                  <Text style={styles.titleText}>Battery Level : {batteryLevel}</Text>
                  <Text style={styles.titleText}>Charging Status : {chargeStatus}</Text>
                  <View style={{display: 'flex', alignItems: "center", color: "white", marginTop: 40, backgroundColor: "white", padding: 20}}>
                      <CheckBox style={{display: 'flex'}}
                          disabled={false}
                          value={toggleCheckBox}
                          onValueChange={handleSubjectSelect}
                      />
                      <Text style={{display: 'flex', color: "black" ,fontSize: 18}}>Smart Charging</Text>
                  </View>

                  <View style={{display: 'flex', alignItems: "center", color: "white", marginTop: 40, backgroundColor: "white", padding: 20}}>
                      <CheckBox style={{display: 'flex'}}
                                disabled={false}
                                value={isTimeLeft}
                                onValueChange={(newValue) => setIsTimeLeft(newValue)}
                      />
                      <Text style={{display: 'flex', color: "black" ,fontSize: 18}}>With Time Left</Text>
                  </View>

                  <Text style={{marginTop: 25,  color: "white", fontSize: 16}}>Cent : {cent}</Text>
                  <Text style={{marginTop: 25,  color: "white", fontSize: 16}}>Power : {isPower ? 'ON': 'OFF'}</Text>
                  {/*<View>*/}
                  {/*    <TextInput*/}
                  {/*        style={styles.input}*/}
                  {/*        placeholder="Threshold"*/}
                  {/*        placeholderTextColor="#ffffff"*/}
                  {/*        value={threshold}*/}
                  {/*        onChangeText={ setThreshold }*/}
                  {/*        keyboardType="numeric"*/}
                  {/*    />*/}
                  {/*</View>*/}
                  {/*<View>*/}
                  {/*      <Button*/}
                  {/*        title="SET NOTIFICATION"*/}
                  {/*        color="red"*/}
                  {/*        onPress={handleSetTheAlarm}*/}
                  {/*      />*/}
                  {/*</View>*/}
              </ScrollView>}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "white"

  },
  formHeading: {
    color: "#ffffff",
  },
  wrapper: {
    margin: 30,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 50,
    margin:30
  },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});