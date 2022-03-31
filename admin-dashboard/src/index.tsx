import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(`CompanyName=
AnyWare E-Commerce LTD._on_behalf_of_AT&T Interwise Ltd.,
LicensedApplication=CITE project,
LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=8,
LicensedProductionInstancesCount=1,AssetReference=AG-013965,
ExpiryDate=11_March_2022_[v2]_MTY0Njk1NjgwMDAwMA==
e5bc75e5e61650f7185620de61701be7
`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
