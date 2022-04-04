const CurrentCycle = (props: any) => {

  const currentCycle = props.value;
  const estimatedCycles = props.node.data.estimatedCycles;

  return (
    <div className={"current-cycle"}
         style={{width: `${estimatedCycles * 5}px`}}>
      <span className={'cycle-number'} style={{left: `${(currentCycle * 5) - 5}px`}}>{currentCycle}</span>
      <span className={'cycle-point'} style={{left: `${currentCycle * 5}px`}} />
    </div>
  )
}

export default CurrentCycle;