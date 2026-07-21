import { WeatherAPIService } from './weatherAPI';

const currentWeatherResponse = {
  name: 'Indore',
  main: {
    temp: 28.4,
    temp_max: 31.2,
    temp_min: 24.7,
    humidity: 68,
    pressure: 1008
  },
  weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }],
  wind: { speed: 3 },
  visibility: 8000,
  sys: { country: 'IN', sunrise: 1721340000, sunset: 1721389000 }
};

describe('WeatherAPIService', () => {
  let service;

  beforeEach(() => {
    service = new WeatherAPIService();
    service.apiKey = 'test-key';
  });

  test('builds a request URL using the configured key', () => {
    expect(service.buildURL('https://example.com/weather?q=', 'Indore,IN'))
      .toBe('https://example.com/weather?q=Indore,IN&appid=test-key');
  });

  test('formats current weather values for the UI', () => {
    const result = service.formatCurrentWeatherData(currentWeatherResponse);

    expect(result).toMatchObject({
      name: 'Indore',
      temp: '28°',
      high: '31°',
      low: '25°',
      humidity: '68%',
      windSpeed: '11 km/h',
      visibility: '8.0 km',
      country: 'IN'
    });
  });

  test('returns cached data within the cache window', () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    service.setCachedData('indore', { temp: '28°' });
    Date.now.mockReturnValue(2000);

    expect(service.getCachedData('indore')).toEqual({ temp: '28°' });
    Date.now.mockRestore();
  });
});
