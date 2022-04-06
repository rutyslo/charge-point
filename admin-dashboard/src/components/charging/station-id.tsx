const StationId = (props: any) => {

  const openModal = () => {
    props.showModal();
    props.setCurrentCp(props.value);
  }

  return (
    <div onClick={openModal} style={{cursor: 'pointer'}}>{props.value}</div>
  );
}

export default StationId;