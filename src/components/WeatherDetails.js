import React from 'react';

const WeatherDetails = ({ cityData }) => {
  if (!cityData) return null;

  const getAirQualityColor = (quality) => {
    switch(quality?.toLowerCase()) {
      case 'good': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'poor': return '#F44336';
      case 'unhealthy': return '#9C27B0';
      default: return '#757575';
    }
  };

  const getUVIndexColor = (uvIndex) => {
    const uv = parseInt(uvIndex);
    if (uv <= 2) return '#4CAF50';
    if (uv <= 5) return '#FF9800';
    if (uv <= 7) return '#F44336';
    if (uv <= 10) return '#9C27B0';
    return '#B71C1C';
  };

  return (
    <div className="weather-details">
      <h3>🌦️ WEATHER DETAILS</h3>
      <div className="details-grid">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{cityData.humidity || 'N/A'}</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{cityData.windSpeed || 'N/A'}</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{cityData.pressure || 'N/A'}</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{cityData.visibility || 'N/A'}</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">☀️</div>
          <div className="detail-content">
            <span className="detail-label">UV Index</span>
            <span 
              className="detail-value"
              style={{ color: getUVIndexColor(cityData.uvIndex) }}
            >
              {cityData.uvIndex || 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">🍃</div>
          <div className="detail-content">
            <span className="detail-label">Air Quality</span>
            <span 
              className="detail-value"
              style={{ color: getAirQualityColor(cityData.airQuality) }}
            >
              {cityData.airQuality || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
