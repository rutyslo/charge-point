import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './header.scss';

const Header = () => {

  return (
    <>
      <div className='att-logo'>
        <div style={{display: 'flex', paddingRight: '17px'}}>
          <img src={logo} alt='logo' />
          <span className={'att-name'}>AT&T</span>
        </div>
        <span className={'app-name'}> | SMART EV CHARGING</span>
      </div>

      <nav className={'navbar'}>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/charging'}>Charging</NavLink>
        <NavLink to={'/consumption'}>Consumption</NavLink>
        <NavLink to={'/expenses'}>Expenses</NavLink>
      </nav>
    </>
  )
}

export default Header;