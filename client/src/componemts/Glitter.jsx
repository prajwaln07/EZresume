import React from 'react';
import './glitter.css';

const Glitter = ({ children }) => {
  return (
    <span className="glitter text-5xl">{children}</span>
  );
};

export default Glitter;
