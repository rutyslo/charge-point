import './map.scss'
import moment from "moment";
import {useState} from "react";
import axios from "axios";
import {ReactComponent as Play} from "../../assets/play.svg";
import {ReactComponent as Pause} from "../../assets/pause.svg";
import {ReactComponent as Start} from "../../assets/back.svg";

const Map = (props: any) => {

  const BE_URL = 'http://iltlvmac0171.intl.att.com:4000';

  const rowData: any[] = props.rowData;
  const dateNow: string = props.dateNow;
  const newIndex: number = props.newIndex;
  const removeIndex : number = props.removeIndex;

  const [isSimulatorPlay, setIsSimulatorPlay] = useState(true);
  const statusArray = ['disabled', 'charged', 'discharged', 'free'];

    const sendIsSimulatorPlay = () => {
        axios.post(`${BE_URL}/is-simulator-play`, { isSimulatorPlay : !isSimulatorPlay })
            .then((response: any) => {
                setIsSimulatorPlay(response.data.isSimulatorPlay);
            });
    }

    const startAgain = () => {
        axios.get(`${BE_URL}/start-long-parking`)
            .then((response: any) => {
            });
    }

  const header = ['Car','Status','Estimated Cycles','Current Cycle'];
  return (
      (rowData.length) ?
          <>
              <div className={"top"}>
                  <div className={"time-wrapper"}>
                      <div className={"date"}>{moment(dateNow).format("MMMM DD")}</div>
                      <div className={"time"}>{moment(dateNow).format("HH:mm A")}</div>
                  </div>
                  <div className={"button-wrapper"}>
                      <Start onClick={startAgain} />
                      {!isSimulatorPlay ? <Play onClick={sendIsSimulatorPlay} /> : <Pause onClick={sendIsSimulatorPlay}/>}
                  </div>
              </div>
          <div className={"map-area"}>
             <div className={"map"}>
              <div className={"map-wrapper"}>
                  <div className={"road"}>
                      {newIndex ? <div className={`car car-${newIndex}`}></div> : <></>}
                      {removeIndex ? <div className={`car-left car-left-${removeIndex}`}></div> : <></>}
                  </div>
                  <div className={"road-half"}>
                      <div className={"msg"}>
                          <div className={"msg-wrapper"}>
                              <span className={"title"}>ENTER</span>
                              <span className={"text"}>Spaces: {rowData.filter(function (el) {
                                  return el.status === 0
                              }).length}</span>
                          </div>

                      </div>
                  </div>

                  <div className={"parking"}>
                      <div className={"parking-wrapper"}>
                          {rowData.map((row, index) => {
                              return <div key={index}
                                          className={`item ${statusArray[row.status]} ${index < 8 ? `first-line` : `second-line`}`}>
                                  {index < 8 ? <div className={"number-up"}>{index + 1 }</div> : <></>}
                                  <div className={`item-${(index+1).toString()}`}></div>
                                  {index >= 8 ? <div className={"number-down"}>{index + 1 }</div> : <></>}
                              </div>
                          })}
                      </div>

                  </div>

              </div>
              <div className={"road-half"}>
                  <div className={"msg"}>
                      <div className={"msg-wrapper"}>
                          <span className={"title"}>EXIT</span><span className={"text"}>Free: $9.00</span>
                      </div>
                  </div>
              </div>
              <div className={"road"}></div>
          </div>
      </div></> : <></>

  )
}

export default Map;