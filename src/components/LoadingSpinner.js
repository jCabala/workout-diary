import React from 'react';
import loadingSpinner from '../images/loading-spinner.gif';

const LoadingSpinner = () => {
  return (
    <img
      style={{
        height: 60,
        width: 60,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      src={loadingSpinner}
      alt='Loading...'
    />
  );
};

export default LoadingSpinner;
