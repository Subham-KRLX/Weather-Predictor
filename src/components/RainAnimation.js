import React from 'react';

const RainAnimation = ({ show }) => {
  if (!show) return null;

  const rainDrops = Array.from({ length: 25 }, (_, index) => (
    <div
      key={index}
      className="rain"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 0.5 + 0.8}s`
      }}
    />
  ));

  return (
    <div className="rain-container">
      {rainDrops}
    </div>
  );
};

export default RainAnimation;
