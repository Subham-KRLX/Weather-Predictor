import React, { useState } from 'react';

const WeatherAlerts = ({ cityData }) => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'heavy-rain',
      severity: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in the next 2 hours. Avoid outdoor activities.',
      icon: '🌧️',
      active: cityData?.condition?.toLowerCase().includes('rain')
    },
    {
      id: 2,
      type: 'high-temp',
      severity: 'advisory',
      title: 'High Temperature',
      message: 'Temperature above 35°C. Stay hydrated and avoid sun exposure.',
      icon: '🌡️',
      active: parseInt(cityData?.temp) > 35
    },
    {
      id: 3,
      type: 'air-quality',
      severity: 'caution',
      title: 'Poor Air Quality',
      message: 'Air quality is poor. Consider wearing a mask outdoors.',
      icon: '😷',
      active: cityData?.airQuality === 'Poor'
    }
  ]);

  const activeAlerts = alerts.filter(alert => alert.active);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'warning': return '#F44336';
      case 'advisory': return '#FF9800';
      case 'caution': return '#FFC107';
      default: return '#2196F3';
    }
  };

  if (activeAlerts.length === 0) {
    return (
      <div className="weather-alerts">
        <h3>⚠️ WEATHER ALERTS</h3>
        <div className="no-alerts">
          <div className="alert-icon">✅</div>
          <div className="alert-message">No weather alerts for your area</div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-alerts">
      <h3>⚠️ WEATHER ALERTS</h3>
      <div className="alerts-list">
        {activeAlerts.map(alert => (
          <div 
            key={alert.id} 
            className="alert-item"
            style={{ borderLeft: `4px solid ${getSeverityColor(alert.severity)}` }}
          >
            <div className="alert-header">
              <span className="alert-icon">{alert.icon}</span>
              <span className="alert-title">{alert.title}</span>
              <span 
                className="alert-severity"
                style={{ color: getSeverityColor(alert.severity) }}
              >
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <div className="alert-message">{alert.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
