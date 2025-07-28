import React, { useState } from 'react';

const WeatherSuggestions = ({ cityData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const generateSuggestions = (weather) => {
    const suggestions = [];
    const temp = parseInt(weather.temp?.replace('°', '') || '25');
    const condition = weather.condition?.toLowerCase() || '';
    const humidity = parseInt(weather.humidity?.replace('%', '') || '50');

    // Temperature-based suggestions
    if (temp > 30) {
      suggestions.push({
        icon: '🥤',
        title: 'Stay Hydrated',
        description: 'It\'s hot outside! Drink plenty of water and avoid prolonged sun exposure.',
        type: 'health'
      });
      suggestions.push({
        icon: '🌞',
        title: 'Sun Protection',
        description: 'Wear sunscreen, sunglasses, and light-colored clothing.',
        type: 'clothing'
      });
    } else if (temp < 15) {
      suggestions.push({
        icon: '🧥',
        title: 'Dress Warmly',
        description: 'It\'s chilly! Wear layers and don\'t forget a jacket.',
        type: 'clothing'
      });
      suggestions.push({
        icon: '☕',
        title: 'Warm Beverages',
        description: 'Perfect weather for hot tea, coffee, or soup.',
        type: 'food'
      });
    }

    // Condition-based suggestions
    if (condition.includes('rain') || condition.includes('drizzle')) {
      suggestions.push({
        icon: '☂️',
        title: 'Take an Umbrella',
        description: 'Rain expected! Don\'t forget your umbrella or raincoat.',
        type: 'gear'
      });
      suggestions.push({
        icon: '🚗',
        title: 'Drive Carefully',
        description: 'Wet roads ahead. Drive slowly and maintain distance.',
        type: 'travel'
      });
    }

    if (condition.includes('clear') || condition.includes('sunny')) {
      suggestions.push({
        icon: '🚴‍♂️',
        title: 'Perfect for Outdoor Activities',
        description: 'Great weather for cycling, walking, or outdoor sports!',
        type: 'activity'
      });
      suggestions.push({
        icon: '📸',
        title: 'Photography Weather',
        description: 'Clear skies make for excellent photo opportunities.',
        type: 'activity'
      });
    }

    if (condition.includes('cloud')) {
      suggestions.push({
        icon: '🌤️',
        title: 'Comfortable Weather',
        description: 'Mild and pleasant conditions for most activities.',
        type: 'general'
      });
    }

    // Humidity-based suggestions
    if (humidity > 70) {
      suggestions.push({
        icon: '💨',
        title: 'High Humidity',
        description: 'It might feel muggy. Stay in air-conditioned spaces when possible.',
        type: 'comfort'
      });
    }

    // Air quality suggestions
    if (weather.airQuality === 'Poor') {
      suggestions.push({
        icon: '😷',
        title: 'Air Quality Alert',
        description: 'Poor air quality detected. Consider wearing a mask outdoors.',
        type: 'health'
      });
    }

    // Default suggestions if none match
    if (suggestions.length === 0) {
      suggestions.push({
        icon: '🌈',
        title: 'Enjoy the Weather',
        description: 'Have a great day and stay weather-aware!',
        type: 'general'
      });
    }

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  const suggestions = generateSuggestions(cityData);

  const getTypeColor = (type) => {
    const colors = {
      health: '#ff6b6b',
      clothing: '#4ecdc4',
      food: '#45b7d1',
      gear: '#96ceb4',
      travel: '#feca57',
      activity: '#ff9ff3',
      comfort: '#54a0ff',
      general: '#5f27cd'
    };
    return colors[type] || '#ffffff';
  };

  return (
    <div className="weather-suggestions">
      <div className="suggestions-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>💡 Weather Suggestions</h3>
        <button className="expand-btn">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="suggestions-content">
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-card"
                style={{ borderLeft: `4px solid ${getTypeColor(suggestion.type)}` }}
              >
                <div className="suggestion-icon">{suggestion.icon}</div>
                <div className="suggestion-text">
                  <h4>{suggestion.title}</h4>
                  <p>{suggestion.description}</p>
                  <span className="suggestion-type">{suggestion.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSuggestions;
