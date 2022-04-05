import moment from "moment";

const LeaveTime = (props: any) => {

  const leaveTime = props.value;
  const date = moment(leaveTime, 'MM/DD/yyyy HH:mm:ss');
  const now = moment();
  const diff = now.diff(date, 'hours', true);

  return (
    <div className={"leave-time"} style={{textAlign: 'left'}}>
      <span>{leaveTime}</span>
      {
        diff <= 4 &&
        <span style={{fontWeight: 700, color: '#FF585D'}}>  Soon</span>
      }
    </div>
  )
}

export default LeaveTime;