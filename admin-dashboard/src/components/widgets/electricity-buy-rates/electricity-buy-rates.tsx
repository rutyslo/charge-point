const ElectricityBuyRates = () => {

  return (
    <div className={'electricity-buy-rates'} style={{flex: 1}}>
      <div className={'title'}>Electricity buy rates</div>
      <div className={'widget-container'}>
        <iframe src={'http://iltlvmac0175.intl.att.com:3001/'} style={{border: 'none', flex: 1, height: '200px'}} />
      </div>
    </div>
  );
};

export default ElectricityBuyRates;
