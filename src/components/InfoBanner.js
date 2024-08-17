import React from 'react';
import { Link } from 'react-router-dom';
import { infoBannerStyle, infoBannerLinkStyle } from '../styles/styles';

const InfoBanner = () => (
  <div style={infoBannerStyle}>
    <p>
      Save 3% buyer, 3% seller fee. More transparency, learn the process of buying.{' '}
      <Link to="/learn" style={infoBannerLinkStyle}>Click here to learn more</Link>
    </p>
  </div>
);

export default InfoBanner;