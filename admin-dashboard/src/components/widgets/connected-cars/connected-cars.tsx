import './connected-cars.scss';
import ConnectedCarsContent from "./connected-cars-content";

const ConnectedCars = (props: any) => {

  return (
    <div className={'connected-cars-wrapper'}>
      <div className={'title'}>Connected cars</div>
      <div className={'widget-container'}>
        <ConnectedCarsContent {...props} />
      </div>
    </div>
  );
}

export default ConnectedCars;