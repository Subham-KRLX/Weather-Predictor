import React from 'react';

const ForecastSection = ({ forecastData }) => {
  // agr real forecast data hai toh use karega , wrna fallback to sample data
  const defaultForecast = [
    { day: "Today", icon: "🌧️", rain: "65%", low: "22°", high: "27°", tempBarStyle: { left: "20%", width: "60%" } },
    { day: "Wed", icon: "🌧️", rain: "80%", low: "22°", high: "26°", tempBarStyle: { left: "20%", width: "50%" } },
    { day: "Thu", icon: "🌧️", rain: "75%", low: "22°", high: "26°", tempBarStyle: { left: "20%", width: "50%" } },
    { day: "Fri", icon: "🌧️", rain: "75%", low: "22°", high: "26°", tempBarStyle: { left: "20%", width: "50%" } }
  ];

  const calculateTempBarStyle = (low, high, minTemp = 15, maxTemp = 35) => {
    const lowNum = parseInt(low);
    const highNum = parseInt(high);
    const range = maxTemp - minTemp;
    const left = ((lowNum - minTemp) / range) * 100;
    const width = ((highNum - lowNum) / range) * 100;
    return { left: `${Math.max(0, left)}%`, width: `${Math.max(10, width)}%` };
  };

  const displayData = (() => {
    try {
      if (forecastData && Array.isArray(forecastData) && forecastData.length > 0) {
        return forecastData.slice(0, 5).map((item, index) => {
          // Ensure item is an object and has the expected properties
          if (typeof item !== 'object' || item === null) {
            console.warn('Invalid forecast item:', item);
            return {
              day: index === 0 ? "Today" : `Day ${index + 1}`,
              icon: "🌤️",
              rain: "0%",
              low: "20°",
              high: "25°",
              tempBarStyle: calculateTempBarStyle("20°", "25°")
            };
          }
          
          return {
            day: index === 0 ? "Today" : (item.day || `Day ${index + 1}`),
            icon: item.icon || "🌤️",
            rain: item.rain || "0%",
            low: item.low || "20°",
            high: item.high || "25°",
            tempBarStyle: calculateTempBarStyle(item.low || "20°", item.high || "25°")
          };
        });
      }
      return defaultForecast;
    } catch (error) {
      console.error('Error processing forecast data:', error);
      return defaultForecast;
    }
  })();

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
