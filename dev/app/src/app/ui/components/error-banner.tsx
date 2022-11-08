import React from 'react';

const ErrorBanner = ({ error: { name, message } }) => (
  <p className='error banner'>{name}: {message}</p>
);

export default ErrorBanner;
