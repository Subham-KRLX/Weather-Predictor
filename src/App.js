import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RainAnimation from './components/RainAnimation';
import ErrorBoundary from './components/ErrorBoundary';
import weatherAPI from './services/weatherAPI';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState({});
  const [showRain, setShowRain] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const selectedCityData = cities[selectedCity];
    if (selectedCityData) {
      updateBackground(selectedCityData.condition);
    }
    
    // Load initial weather data only once
    if (!isInitialized) {
      loadInitialWeatherData();
      setIsInitialized(true);
    }
  }, [selectedCity, cities, isInitialized]);

  const loadInitialWeatherData = async () => {
    setLoading(true);
    
    try {
      // Load just one default city (user's location or a major city)
      const weatherData = await weatherAPI.getCurrentWeather('Indore', 'IN');
      const forecastData = await weatherAPI.getForecast('Indore', 'IN');
      const cityKey = 'indore';
      
      setCities({ [cityKey]: { ...weatherData, forecast: forecastData } });
      setSelectedCity(cityKey);
      
    } catch (error) {
      console.error('Failed to load initial city:', error.message);
      setError('Failed to load weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const refreshWeatherData = async (cityKey) => {
    const cityData = cities[cityKey];
    if (!cityData) return;
    
    setLoading(true);
    try {
      const countryCode = cityData.country === 'IN' ? 'IN' : '';
      const weatherData = await weatherAPI.getCurrentWeather(cityData.name, countryCode);
      const forecastData = await weatherAPI.getForecast(cityData.name, countryCode);
      
      setCities(prevCities => ({
        ...prevCities,
        [cityKey]: {
          ...weatherData,
          forecast: forecastData,
          originalKey: cityKey
        }
      }));
      
      showNotification(`${cityData.name} weather updated!`, 'success');
    } catch (error) {
      showNotification(`Failed to update ${cityData.name}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (condition) => {
    const body = document.body;
    
    if (condition.toLowerCase().includes('rain')) {
      body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)';
      setShowRain(true);
    } else if (condition.toLowerCase().includes('cloudy')) {
      body.style.background = 'linear-gradient(135deg, #3498db 0%, #2c3e50 50%, #34495e 100%)';
      setShowRain(false);
    } else if (condition.toLowerCase().includes('sunny')) {
      body.style.background = 'linear-gradient(135deg, #f39c12 0%, #e74c3c 50%, #9b59b6 100%)';
      setShowRain(false);
    } else {
      body.style.background = 'linear-gradient(135deg, #3498db 0%, #2c3e50 50%, #34495e 100%)';
      setShowRain(false);
    }
  };

  const addNewCity = async (cityName, country, state) => {
    const cityKey = cityName.toLowerCase().replace(/\s+/g, '');
    
    if (cities[cityKey]) {
      showNotification('City already added!', 'warning');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch real weather data and forecast
      const countryCode = country === 'India' ? 'IN' : '';
      const weatherData = await weatherAPI.getCurrentWeather(cityName, countryCode);
      const forecastData = await weatherAPI.getForecast(cityName, countryCode);
      
      setCities(prevCities => ({
        ...prevCities,
        [cityKey]: { ...weatherData, forecast: forecastData }
      }));
      
      setSelectedCity(cityKey);
      showNotification(`${cityName} added successfully!`, 'success');
      
    } catch (error) {
      console.error('API Error:', error);
      setError(`Failed to add ${cityName}. Please check the city name and try again.`);
      showNotification(`Failed to add ${cityName}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (cityKey) => {
    const cityName = cities[cityKey]?.name;
    
    if (window.confirm(`Remove ${cityName} from your locations?`)) {
      setCities(prevCities => {
        const newCities = { ...prevCities };
        delete newCities[cityKey];
        return newCities;
      });
      
      // If we're removing the selected city, select the first available city
      if (selectedCity === cityKey) {
        const remainingCities = Object.keys(cities).filter(key => key !== cityKey);
        if (remainingCities.length > 0) {
          setSelectedCity(remainingCities[0]);
        } else {
          // If no cities left, load Indore as default
          loadInitialWeatherData();
        }
      }
      
      showNotification(`${cityName} removed successfully!`);
    }
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const backgroundColor = {
      success: 'rgba(76, 175, 80, 0.9)',
      error: 'rgba(244, 67, 54, 0.9)',
      warning: 'rgba(255, 152, 0, 0.9)',
      info: 'rgba(33, 150, 243, 0.9)'
    }[type] || 'rgba(0, 0, 0, 0.8)';
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${backgroundColor};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideIn 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  };

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e) => {
      const cityKeys = Object.keys(cities);
      const currentIndex = cityKeys.indexOf(selectedCity);
      
      switch(e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + cityKeys.length) % cityKeys.length;
          setSelectedCity(cityKeys[prevIndex]);
          break;
          
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % cityKeys.length;
          setSelectedCity(cityKeys[nextIndex]);
          break;
          
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCity, cities]);

  return (
    <ErrorBoundary>
      <div className="App">
        <RainAnimation show={showRain} />
        
        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}
        
        <div className="app-container">
          <Sidebar
            cities={cities}
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
            onCityAdd={addNewCity}
            onCityRemove={removeCity}
            loading={loading}
          />
          {Object.keys(cities).length === 0 && !loading && !error ? (
            <div className="no-data-message">
              <h2>Welcome to Weather App</h2>
              <p>Loading weather data...</p>
            </div>
          ) : (
            <MainContent
              cityData={cities[selectedCity]}
              isHome={selectedCity === 'indore'}
              cities={cities}
              onCitySelect={setSelectedCity}
              selectedCity={selectedCity}
              onRefresh={() => refreshWeatherData(selectedCity)}
              loading={loading}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
