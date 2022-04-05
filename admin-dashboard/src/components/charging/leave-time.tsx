const LeaveTime = (props: any) => {

  const leaveTime = props.value;

  return (
    <div className={"leave-time"} style={{textAlign: 'left'}}>
      <span>{leaveTime}</span>
      {
        props.node.data.status === 4 &&
        <span style={{fontWeight: 700, color: '#FF585D'}}>  Soon</span>
      }
    </div>
  )
}

export default LeaveTime;