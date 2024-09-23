import React from 'react';
import { Typography } from '@material-ui/core';
import aeroImage from '../../assets/aero.png';


const Mascot = () => (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <img src={aeroImage} alt="Mascot" style={{ maxWidth: '100%' }} />
    <Typography variant="h6">Plan your first adventure!</Typography>
  </div>
);

export default Mascot;
