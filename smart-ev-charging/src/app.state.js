import {action, observable,  decorate} from "mobx";
import carImg1 from "./assets/images/car-img-1.png";
import carImg1Small from "./assets/images/small_car.png";
import carImg2 from "./assets/images/car-img-2.png";

class AppState {

   carList = [{id: 1, isCharged: true, name : `George McFly`, type : 'VOLKSWAGEN iD.3', image : carImg1, smallImg: carImg1Small,
       hours: 220, minutesLeft: 181, percent: 55, mile: 220, isSmartCharging: false, isHomeCharging: false, kw: 55*0.75, price: 0.13, maxBattery: 100, minBattery:50},
        {id: 2,  isCharged: false, name : `Lauren McFly`, type : 'Mustang Mach-E', image : carImg2, smallImg: carImg1Small,
            hours: 166, minutesLeft : 181 , percent: 55, mile: 220, isSmartCharging: false, isHomeCharging: false, kw: 55*0.75, price: 0.13, maxBattery: 100, minBattery:50}];

   carIndex = 0;

    setCar(car, index) {
        this.carList[index] = car;
    }

    setIndex(index) {
        this.carIndex = index;
    }
}
decorate(AppState, {
    carList: observable,
    carIndex: observable,
    setCar: action,
    setIndex: action
});
const appState = new AppState();
export default appState;