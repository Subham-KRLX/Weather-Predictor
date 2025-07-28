import React, { useState, useRef } from 'react';
import WeatherSettings from './WeatherSettings';
import weatherAPI from '../services/weatherAPI';

const Sidebar = ({ cities, selectedCity, onCitySelect, onCityAdd, onCityRemove, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchInput = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear results if query is empty
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Only search if query has at least 2 characters
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      let weatherData = null;
      
      // Try different search strategies for better city finding
      const searchStrategies = [
        // 1. Try with exact query + India country code
        { query: query, country: 'IN' },
        // 2. Try with exact query without country code
        { query: query, country: '' },
        // 3. Try with state appended (common for smaller cities)
        { query: `${query}, India`, country: '' },
        // 4. Try with common state names for Indian cities
        { query: `${query}, Madhya Pradesh`, country: 'IN' },
        { query: `${query}, Maharashtra`, country: 'IN' },
        { query: `${query}, Uttar Pradesh`, country: 'IN' },
        { query: `${query}, Gujarat`, country: 'IN' },
        { query: `${query}, Rajasthan`, country: 'IN' }
      ];
      
      // Try each strategy until one works
      for (const strategy of searchStrategies) {
        try {
          weatherData = await weatherAPI.getCurrentWeather(strategy.query, strategy.country);
          console.log(`Found ${query} using strategy: ${strategy.query}, ${strategy.country}`);
          break; // Stop if we found the city
        } catch (error) {
          // Continue to next strategy
          continue;
        }
      }
      
      if (weatherData) {
        // If successful, show this city as a search result
        setSearchResults([{
          name: weatherData.name,
          country: weatherData.country || 'IN',
          state: 'India',
          weatherData: weatherData
        }]);
      } else {
        // If all strategies failed, show no results
        setSearchResults([]);
      }
      setShowResults(true);
    } catch (error) {
      // If city not found, show no results
      setSearchResults([]);
      console.log(`City "${query}" not found with any search strategy:`, error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '' && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleCityAdd = (cityData) => {
    // Pass the city name and country to addNewCity function
    const cityName = cityData.name;
    const country = cityData.weatherData?.country || 'IN';
    onCityAdd(cityName, country);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="sidebar">
      {/* Search Section */}
      <div className="search-section">
        <div className="search-header">
          <h3>🔍 Search Cities</h3>
          <WeatherSettings />
        </div>
        <div className="search-container">
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search for any city (e.g., Indore, Rau, Chennai)..."
            value={searchQuery}
            onChange={handleSearchInput}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="search-btn" disabled={loading || isSearching}>
            {loading || isSearching ? '⏳' : '🔍'}
          </button>
        </div>
        
        {showResults && (
          <div className="search-results">
            {isSearching ? (
              <div className="loading">Searching cities...</div>
            ) : searchResults.length === 0 ? (
              <div className="no-results">
                {searchQuery.length >= 2 ? 'No cities found. Try a different spelling.' : 'Type at least 2 characters to search'}
              </div>
            ) : (
              searchResults.map((city, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleCityAdd(city)}
                >
                  <div className="city-name">{city.name}</div>
                  <div className="city-location">
                    {city.country === 'IN' ? 'India' : city.country}
                  </div>
                  <div className="city-temp">{city.weatherData?.temp}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Cities List */}
      <div className="cities-list">
        {Object.keys(cities).length === 0 ? (
          <div className="no-cities">
            <div className="loading-message">
              {loading ? (
                <>
                  <div className="small-spinner"></div>
                  <p>Loading cities...</p>
                </>
              ) : (
                <p>No cities loaded. Add cities using search above.</p>
              )}
            </div>
          </div>
        ) : (
          Object.entries(cities).map(([cityKey, cityData]) => (
            <div
              key={cityKey}
              className={`location-card ${selectedCity === cityKey ? 'active' : ''}`}
              onClick={() => onCitySelect(cityKey)}
            >
              <div className="location-header">
                <h3>{cityData.name}</h3>
                {cityKey === 'pune' ? (
                  <span className="location-tag">My Location • HOME</span>
                ) : cityData.lastUpdated ? (
                  <span className="time">Live Data</span>
                ) : (
                  <span className="time">{getCurrentTime()}</span>
                )}
              </div>
              
              {cityKey !== 'pune' && (
                <button 
                  className="remove-city" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCityRemove(cityKey);
                  }}
                  title="Remove city"
                >
                  ×
                </button>
              )}
              
              <div className="temperature">{cityData.temp}</div>
              <div className="condition">{cityData.condition}</div>
              <div className="temp-range">H:{cityData.high} L:{cityData.low}</div>
              
              {cityData.lastUpdated && (
                <div className="live-indicator">🟢 Live</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
