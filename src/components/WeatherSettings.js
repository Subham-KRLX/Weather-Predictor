import React, { useState, useEffect } from 'react';

const WeatherSettings = () => {
  const [settings, setSettings] = useState({
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    pressureUnit: 'hpa',
    timeFormat: '12h',
    autoRefresh: true,
    notifications: true,
    theme: 'auto'
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('weatherAppSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('weatherAppSettings', JSON.stringify(newSettings));
  };

  return (
    <>
      <button 
        className="settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Settings"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="settings-overlay" onClick={() => setIsOpen(false)}>
          <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h3>⚙️ Settings</h3>
              <button 
                className="close-settings"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="settings-content">
              <div className="setting-group">
                <label>Temperature Unit</label>
                <select 
                  value={settings.temperatureUnit}
                  onChange={(e) => updateSetting('temperatureUnit', e.target.value)}
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Wind Speed Unit</label>
                <select 
                  value={settings.windSpeedUnit}
                  onChange={(e) => updateSetting('windSpeedUnit', e.target.value)}
                >
                  <option value="kmh">km/h</option>
                  <option value="mph">mph</option>
                  <option value="ms">m/s</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Pressure Unit</label>
                <select 
                  value={settings.pressureUnit}
                  onChange={(e) => updateSetting('pressureUnit', e.target.value)}
                >
                  <option value="hpa">hPa</option>
                  <option value="inhg">inHg</option>
                  <option value="mmhg">mmHg</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Time Format</label>
                <select 
                  value={settings.timeFormat}
                  onChange={(e) => updateSetting('timeFormat', e.target.value)}
                >
                  <option value="12h">12 Hour</option>
                  <option value="24h">24 Hour</option>
                </select>
              </div>

              <div className="setting-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={(e) => updateSetting('autoRefresh', e.target.checked)}
                  />
                  Auto Refresh Data
                </label>
              </div>

              <div className="setting-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => updateSetting('notifications', e.target.checked)}
                  />
                  Enable Notifications
                </label>
              </div>

              <div className="setting-group">
                <label>Theme</label>
                <select 
                  value={settings.theme}
                  onChange={(e) => updateSetting('theme', e.target.value)}
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherSettings;
