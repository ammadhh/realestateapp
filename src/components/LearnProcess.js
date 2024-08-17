import React from 'react';
import { learnProcessStyle, learnStepStyle } from '../styles/styles';

const LearnProcess = () => (
  <div style={learnProcessStyle}>
    <h2>How to Buy a House</h2>
    <ol>
      <li style={learnStepStyle}>Determine your budget and get pre-approved for a mortgage</li>
      <li style={learnStepStyle}>Research neighborhoods and decide on your must-haves</li>
      <li style={learnStepStyle}>Find home on Zero Agent</li>
      <li style={learnStepStyle}>Make an offer and negotiate the price</li>
      <li style={learnStepStyle}>Get a home inspection and appraisal</li>
      <li style={learnStepStyle}>Close the deal and move into your new home</li>
    </ol>
    <p>By working with our platform, you can save on both buyer and seller fees, enjoying more transparency throughout the entire process. Our experts are here to guide you every step of the way, ensuring a smooth and cost-effective home buying experience.</p>
  </div>
);

export default LearnProcess;