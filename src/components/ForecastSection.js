import React from 'react';
import { getDisplayForecast } from '../utils/forecastUtils';

const ForecastSection = ({ forecastData }) => {
  const displayData = getDisplayForecast(forecastData);

  return (
    <div className="forecast-section">
      <h3>📅 5-DAY FORECAST</h3>
      <div className="forecast-list">
        {displayData.map((item, index) => (
          <div key={index} className="forecast-item">
            <span className="day">{item.day}</span>
            <div className="forecast-icon">{item.icon}</div>
            <span className="rain-percent">{item.rain}</span>
            <span className="low-temp">{item.low}</span>
            <div className="temp-bar">
              <div className="temp-range-bar">
                <div 
                  className="temp-fill" 
                  style={item.tempBarStyle}
                />
              </div>
            </div>
            <span className="high-temp">{item.high}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
