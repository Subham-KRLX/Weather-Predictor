import React from 'react';
import HourlyForecast from './HourlyForecast';
import ForecastSection from './ForecastSection';
import PrecipitationSection from './PrecipitationSection';
import WeatherDetails from './WeatherDetails';
import WeatherAlerts from './WeatherAlerts';
import FavoriteCities from './FavoriteCities';
import WeatherSuggestions from './WeatherSuggestions';

const MainContent = ({ cityData, isHome, cities, onCitySelect, selectedCity, onRefresh, loading }) => {
  if (!cityData) return null;

  const formatLastUpdated = (lastUpdated) => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diff = now - lastUpdated;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return lastUpdated.toLocaleDateString();
  };

  return (
    <div className="main-content">
      <div className="main-weather">
        <div className="weather-header">
          {isHome && <div className="home-indicator">🏠 HOME</div>}
          <div className="refresh-container">
            {cityData.lastUpdated && (
              <span className="last-updated">
                Updated: {formatLastUpdated(cityData.lastUpdated)}
              </span>
            )}
            <button 
              className={`refresh-btn ${loading ? 'loading' : ''}`}
              onClick={onRefresh}
              disabled={loading}
              title="Refresh weather data"
            >
              {loading ? '⏳' : '🔄'}
            </button>
          </div>
        </div>
        <h1 className="city-name">{cityData.name}</h1>
        <div className="current-temp">{cityData.temp}</div>
        <div className="current-condition">{cityData.condition}</div>
        <div className="current-range">H:{cityData.high} L:{cityData.low}</div>
        <div className="weather-description">
          {cityData.description}
        </div>
      </div>

      <div className="hourly-forecast-container">
        <HourlyForecast hourlyData={cityData.hourly} />
      </div>

      <div className="top-section">
        <WeatherDetails cityData={cityData} />
        <WeatherAlerts cityData={cityData} />
      </div>

      <div className="middle-section">
        <WeatherSuggestions cityData={cityData} />
        {Object.keys(cities).length > 0 && (
          <FavoriteCities 
            cities={cities}
            onCitySelect={onCitySelect}
            selectedCity={selectedCity}
          />
        )}
      </div>

      <div className="bottom-section">
        <ForecastSection forecastData={Array.isArray(cityData.forecast) ? cityData.forecast : null} />
        <PrecipitationSection cityData={cityData} />
      </div>
    </div>
  );
};

export default MainContent;
