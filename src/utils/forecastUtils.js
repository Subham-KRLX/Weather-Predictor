const defaultForecast = [
  { day: 'Today', icon: '🌧️', rain: '65%', low: '22°', high: '27°', tempBarStyle: { left: '20%', width: '60%' } },
  { day: 'Wed', icon: '🌧️', rain: '80%', low: '22°', high: '26°', tempBarStyle: { left: '20%', width: '50%' } },
  { day: 'Thu', icon: '🌧️', rain: '75%', low: '22°', high: '26°', tempBarStyle: { left: '20%', width: '50%' } },
  { day: 'Fri', icon: '🌧️', rain: '75%', low: '22°', high: '26°', tempBarStyle: { left: '20%', width: '50%' } }
];

export const calculateTempBarStyle = (low, high, minTemp = 15, maxTemp = 35) => {
  const lowNum = parseInt(low);
  const highNum = parseInt(high);
  const range = maxTemp - minTemp;
  const left = ((lowNum - minTemp) / range) * 100;
  const width = ((highNum - lowNum) / range) * 100;
  return { left: `${Math.max(0, left)}%`, width: `${Math.max(10, width)}%` };
};

export const getDisplayForecast = (forecastData) => {
  try {
    if (!Array.isArray(forecastData) || forecastData.length === 0) {
      return defaultForecast;
    }

    return forecastData.slice(0, 5).map((item, index) => {
      if (typeof item !== 'object' || item === null) {
        return {
          day: index === 0 ? 'Today' : `Day ${index + 1}`,
          icon: '🌤️',
          rain: '0%',
          low: '20°',
          high: '25°',
          tempBarStyle: calculateTempBarStyle('20°', '25°')
        };
      }

      const low = item.low || '20°';
      const high = item.high || '25°';
      return {
        day: index === 0 ? 'Today' : (item.day || `Day ${index + 1}`),
        icon: item.icon || '🌤️',
        rain: item.rain || '0%',
        low,
        high,
        tempBarStyle: calculateTempBarStyle(low, high)
      };
    });
  } catch (error) {
    return defaultForecast;
  }
};

