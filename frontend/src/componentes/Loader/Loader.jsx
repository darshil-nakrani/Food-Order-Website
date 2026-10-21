import React from 'react';
import './Loader.css';
import { assets } from '../../assets/assets';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="loader-circle"></div>
        <img src={assets.logo} alt="Loading..." className="loader-logo" />
      </div>
      <p className="loader-text">Preparing your feast...</p>
    </div>
  );
};

export default Loader;
