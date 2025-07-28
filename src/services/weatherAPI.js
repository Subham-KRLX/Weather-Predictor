// Weather API Service
class WeatherAPIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_WEATHER_API_URL;
    this.forecastURL = process.env.REACT_APP_FORECAST_API_URL;
    this.apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    this.cache = new Map();
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
  }

  buildURL(baseURL, query) {
    if (!this.apiKey || this.apiKey === 'your_openweathermap_api_key_here') {
      throw new Error('Please set your OpenWeatherMap API key in the .env file');
    }
    return `${baseURL}${query}&appid=${this.apiKey}`;
  }

  // Check cache for recent data
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Cache API response
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Get current weather for a city
  async getCurrentWeather(cityName, countryCode = '') {
    const query = countryCode ? `${cityName},${countryCode}` : cityName;
    const cacheKey = `current_${query}`;
    
    console.log(`Fetching weather for: ${query}`);
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log(`Using cached data for ${query}`);
      return cached;
    }

    try {
      const url = this.buildURL(this.baseURL, query);
      console.log(`API URL: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${cityName}" not found`);
        }
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Raw API data for ${query}:`, data);
      
      const formattedData = this.formatCurrentWeatherData(data);
      console.log(`Formatted data for ${query}:`, formattedData);
      
      // Cache the result
      this.setCachedData(cacheKey, formattedData);
      
      return formattedData;
    } catch (error) {
      console.error(`Error fetching current weather for ${query}:`, error);
      throw error;
    }
  }

  // Get 5-day forecast for a city
  async getForecast(cityName, countryCode = '') {
    const query = countryCode ? `${cityName},${countryCode}` : cityName;
    const cacheKey = `forecast_${query}`;
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const url = this.buildURL(this.forecastURL, query);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      const data = await response.json();
      const formattedData = this.formatForecastData(data);
      
      // Cache the result
      this.setCachedData(cacheKey, formattedData);
      
      return formattedData;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  // Format OpenWeatherMap current weather data to match our app structure
  formatCurrentWeatherData(data) {
    const getWeatherIcon = (iconCode) => {
      const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '🌤️', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
      };
      return iconMap[iconCode] || '☁️';
    };

    const getAirQualityFromVisibility = (visibility) => {
      if (visibility >= 10000) return 'Good';
      if (visibility >= 5000) return 'Moderate';
      return 'Poor';
    };

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return {
      name: data.name,
      temp: `${Math.round(data.main.temp)}°`,
      condition: data.weather[0]?.main || 'Unknown',
      high: `${Math.round(data.main.temp_max)}°`,
      low: `${Math.round(data.main.temp_min)}°`,
      description: capitalize(data.weather[0]?.description || 'No description available'),
      humidity: `${data.main.humidity}%`,
      windSpeed: `${Math.round(data.wind?.speed * 3.6 || 0)} km/h`, // Convert m/s to km/h
      pressure: `${data.main.pressure} hPa`,
      visibility: `${((data.visibility || 10000) / 1000).toFixed(1)} km`,
      uvIndex: '0', // OpenWeatherMap doesn't provide UV in basic plan
      airQuality: getAirQualityFromVisibility(data.visibility || 10000),
      hourly: this.generateHourlyFromCurrent(data),
      country: data.sys?.country,
      sunrise: new Date((data.sys?.sunrise || 0) * 1000),
      sunset: new Date((data.sys?.sunset || 0) * 1000),
      icon: getWeatherIcon(data.weather[0]?.icon),
      lastUpdated: new Date()
    };
  }

  // Generate hourly data from current weather (simplified)
  generateHourlyFromCurrent(data) {
    const currentTemp = data.main.temp;
    const condition = data.weather[0]?.main;
    const currentHour = new Date().getHours();
    
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };

    const icon = iconMap[condition] || '☁️';
    
    // Generate 24 hours of data starting from current hour
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour + i) % 24;
      let timeLabel;
      
      if (i === 0) {
        timeLabel = 'Now';
      } else if (hour === 0) {
        timeLabel = '12AM';
      } else if (hour < 12) {
        timeLabel = `${hour}AM`;
      } else if (hour === 12) {
        timeLabel = '12PM';
      } else {
        timeLabel = `${hour - 12}PM`;
      }
      
      hours.push({ hour, timeLabel, index: i });
    }
    
    return hours.map(({ hour, timeLabel, index }) => {
      // Check for sunset time (around 7:13 PM)
      if (hour === 19 && index <= 6) {
        return { time: '7:13PM', icon: '🌅', temp: null, special: 'Sunset' };
      }
      
      // Simulate realistic temperature variation throughout the day
      // Cooler at night, warmer during day
      let tempVariation = 0;
      if (hour >= 6 && hour <= 18) {
        // Daytime: warmer
        tempVariation = Math.sin(((hour - 6) * Math.PI) / 12) * 5;
      } else {
        // Nighttime: cooler
        tempVariation = -3 + Math.sin(((hour + 6) * Math.PI) / 12) * 2;
      }
      
      const temp = Math.round(currentTemp + tempVariation);
      const rain = condition === 'Rain' && Math.random() > 0.5 
        ? `${Math.floor(Math.random() * 40) + 20}%` 
        : null;
      
      return {
        time: timeLabel,
        icon: icon,
        temp: `${temp}°`,
        rain: rain
      };
    });
  }

  // Format forecast data
  formatForecastData(data) {
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateKey = date.toDateString(); // Use full date as key for better grouping
      
      if (!dailyForecasts[dateKey]) {
        dailyForecasts[dateKey] = {
          day: day,
          temps: [],
          conditions: [],
          humidity: [],
          rain: []
        };
      }
      
      dailyForecasts[dateKey].temps.push(item.main.temp);
      dailyForecasts[dateKey].conditions.push(item.weather[0].main);
      dailyForecasts[dateKey].humidity.push(item.main.humidity);
      if (item.rain) {
        dailyForecasts[dateKey].rain.push(item.rain['3h'] || 0);
      }
    });

    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️'
    };

    const forecastArray = Object.values(dailyForecasts).map(dayData => {
      const maxTemp = Math.max(...dayData.temps);
      const minTemp = Math.min(...dayData.temps);
      const mostCommonCondition = dayData.conditions.sort((a, b) =>
        dayData.conditions.filter(v => v === a).length - dayData.conditions.filter(v => v === b).length
      ).pop();
      
      return {
        day: dayData.day,
        icon: iconMap[mostCommonCondition] || '☁️',
        rain: dayData.rain.length > 0 ? `${Math.round(Math.max(...dayData.rain))}%` : '0%',
        low: `${Math.round(minTemp)}°`,
        high: `${Math.round(maxTemp)}°`,
      };
    });

    // Ensure we have at least 5 days of forecast
    while (forecastArray.length < 5) {
      const lastDay = forecastArray[forecastArray.length - 1];
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentDayIndex = daysOfWeek.indexOf(lastDay.day);
      const nextDayIndex = (currentDayIndex + 1) % 7;
      const nextDay = daysOfWeek[nextDayIndex];
      
      // Create a new day based on the last day with slight variations
      const baseLow = parseInt(lastDay.low);
      const baseHigh = parseInt(lastDay.high);
      const tempVariation = Math.floor(Math.random() * 4) - 2; // ±2°C variation
      
      forecastArray.push({
        day: nextDay,
        icon: lastDay.icon,
        rain: `${Math.floor(Math.random() * 30) + 10}%`,
        low: `${baseLow + tempVariation}°`,
        high: `${baseHigh + tempVariation}°`,
      });
    }

    return forecastArray.slice(0, 5).map(dayData => {
      // Calculate temp range for bar styling
      const highTemp = parseInt(dayData.high);
      const lowTemp = parseInt(dayData.low);
      const tempRange = highTemp - lowTemp;
      
      return {
        day: dayData.day,
        icon: dayData.icon,
        rain: dayData.rain,
        low: dayData.low,
        high: dayData.high,
        tempBarStyle: { 
          left: '20%', 
          width: `${Math.min(60, tempRange * 3)}%` 
        }
      };
    });
  }
}

export default new WeatherAPIService();
