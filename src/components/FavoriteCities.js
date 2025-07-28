import React, { useState, useEffect } from 'react';

const FavoriteCities = ({ cities, onCitySelect, selectedCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('weatherAppFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (cityKey) => {
    const newFavorites = favorites.includes(cityKey)
      ? favorites.filter(key => key !== cityKey)
      : [...favorites, cityKey];
    
    setFavorites(newFavorites);
    localStorage.setItem('weatherAppFavorites', JSON.stringify(newFavorites));
  };

  const favoriteCities = Object.entries(cities || {}).filter(([key]) => favorites.includes(key));

  if (Object.keys(cities || {}).length === 0) {
    return null; // Don't render if no cities are loaded
  }

  return (
    <div className="favorite-cities">
      <div 
        className="favorites-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>⭐ FAVORITES ({favorites.length})</h3>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>
      
      {isExpanded && (
        <div className="favorites-list">
          {favoriteCities.length === 0 ? (
            <div className="no-favorites">
              <span>No favorite cities yet</span>
              <span>Star cities to add them here</span>
            </div>
          ) : (
            favoriteCities.map(([cityKey, cityData]) => (
              <div
                key={cityKey}
                className={`favorite-item ${selectedCity === cityKey ? 'active' : ''}`}
                onClick={() => onCitySelect(cityKey)}
              >
                <div className="favorite-info">
                  <span className="favorite-name">{cityData.name}</span>
                  <span className="favorite-temp">{cityData.temp}</span>
                </div>
                <div className="favorite-condition">{cityData.condition}</div>
              </div>
            ))
          )}
        </div>
      )}
      
      {selectedCity && cities[selectedCity] && (
        <button
          className={`favorite-toggle ${favorites.includes(selectedCity) ? 'favorited' : ''}`}
          onClick={() => toggleFavorite(selectedCity)}
          title={favorites.includes(selectedCity) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorites.includes(selectedCity) ? '⭐' : '☆'}
        </button>
      )}
    </div>
  );
};

export default FavoriteCities;
