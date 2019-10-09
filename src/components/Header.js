import React from 'react';
import logo from '../logo.png';

const HeaderComponent = () => (
  <div className="header">
    <div className="header__logo">
        <img src={logo} alt="logo" />
    </div>
  </div>
);

export default HeaderComponent;