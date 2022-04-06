import './modal.scss';
import {ReactComponent as Charging} from "../../assets/car-charge.svg";
import {ReactComponent as Discharging} from "../../assets/car-discharge.svg";
import {ReactComponent as Idle} from "../../assets/car-idle.svg";
import {ReactComponent as Done} from "../../assets/car-done.svg";
import moment from 'moment';

const Modal = ({ handleClose, show, currentCP, rowData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const currentCPData = rowData.find(item => item.stationId === currentCP);

  const renderIcon = () => {
    switch (currentCPData.status) {
      case 1:
        return <Charging style={{backgroundColor: '#80ED91', height: '30px'}} />
      case 2:
        return <Discharging style={{backgroundColor: '#EDB6F2', height: '30px'}} />
      case 3:
        return <Idle style={{height: '30px'}} />
      case 4:
        return <Done style={{height: '30px'}} />
      default:
        return null;
    }
  }

  const renderCyclesContent = () => {
    return (
      <>
        <div className={'row header'}>
          <span className={'row-title no-border'}>Cycle #</span>
          <span className={'row-title border'}>Spend ($)</span>
          <span className={'row-title border'}>Save ($)</span>
        </div>
        {[...Array(currentCPData.currentCycle)].map((item, index) =>
          <div className={'row'}>
            <span className={'row-title no-border'}>{index+1}</span>
            <span className={'border'}>0.76</span>
            <span className={'border'}>1.10</span>
          </div>
        )}
        <div className={'row summary'}>
          <span className={'row-title no-border'}>Avg per done cycles ({currentCPData.currentCycle})</span>
          <span className={'row-title border'}>$0.76</span>
          <span className={'row-title border'}>$1.10</span>
        </div>
      </>
    );
  }

  const renderOverallBalance = () => {
    return (
      <>
        <div className={'row header'}>
          <span className={'row-title no-border'}></span>
          <span className={'row-title border'}>Spend ($)</span>
          <span className={'row-title border'}>Save ($)</span>
        </div>
        <div className={'row'}>
          <span className={'row-title no-border'}>Total done cycles ({currentCPData.currentCycle})</span>
          <span className={'border'}>0.80</span>
          <span className={'border'}>1.13</span>
        </div>
        <div className={'row'}>
            <span className={'row-title no-border'}>Est future cycles ({currentCPData.estimatedCycles - currentCPData.currentCycle})</span>
            <span className={'border'}>0.80</span>
            <span className={'border'}>1.13</span>
          </div>
        <div className={'row summary'}>
          <span className={'row-title no-border'}>Est Total</span>
          <span className={'row-title border'} style={{backgroundColor: '#F2F2F2'}}>$23.15</span>
          <span className={'row-title border'} style={{backgroundColor: '#F2F2F2'}}>$31.44</span>
        </div>
      </>
    );
  }

  const renderCarContactDetails = () => {
    return (
      <>
        <div style={{display: 'flex', gap: '100px'}}>
          <div className={'item'}>
            <div className={'key'}>Name</div>
            <div className={'value'}>Tim Wise</div>
          </div>
          <div className={'item'}>
            <div className={'key'}>Phone</div>
            <div className={'value'}>(905) 707-1717</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: '77px'}}>
          <div className={'item'}>
            <div className={'key'}>Drop off</div>
            <div className={'value'}>{moment(currentCPData.arrivalTime).format('MM/DD/yyyy')}</div>
          </div>
          <div className={'item'}>
            <div className={'key'}>Pick up</div>
            <div className={'value'}>{moment(currentCPData.leaveTime).format('MM/DD/yyyy')}</div>
          </div>
        </div>
      </>
    )
    // Name
    // Phone
    // Tim Wise
    // (905) 707-1717
    // Drop off
    // Pick up
    // 4/3/2022
    // 4/11/2022
  }

  return (
    <div className={showHideClassName}>
      {currentCPData && <section className="modal-main">
        <div className={'modal-header'}>
          <div className={'modal-title'}>
            <span>CP {currentCP}</span>
            {renderIcon()}
          </div>
          <div className={'close-modal'} onClick={handleClose}>X</div>
        </div>
        <div className={'modal-content'}>
          <section>
            <div className={'section-title'}>Cycles {currentCPData.currentCycle}/{currentCPData.estimatedCycles}</div>
            <div className={'section-content'}>
              {renderCyclesContent()}
            </div>
          </section>
          <section>
            <div className={'section-title'}>Overall balance</div>
            <div className={'section-content'}>
              {renderOverallBalance()}
            </div>
          </section>
          <section>
            <div className={'section-title'}>Car contact details</div>
            <div className={'section-content'}>
              {renderCarContactDetails()}
            </div>
          </section>
        </div>
      </section>}
    </div>
  );
};

export default Modal;
