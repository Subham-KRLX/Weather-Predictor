import React from 'react';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      {hourlyData.map((hour, index) => (
        <div key={index} className="hourly-item">
          <div className="hour">{hour.time}</div>
          <div className="hour-icon">{hour.icon}</div>
          {hour.rain && <div className="rain-chance">{hour.rain}</div>}
          {hour.special && <div className="sunset-label">{hour.special}</div>}
          {hour.temp && <div className="hour-temp">{hour.temp}</div>}
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
