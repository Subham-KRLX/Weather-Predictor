import { calculateTempBarStyle, getDisplayForecast } from './forecastUtils';

describe('forecast utilities', () => {
  test('calculates a bounded temperature bar', () => {
    expect(calculateTempBarStyle('20°', '25°')).toEqual({
      left: '25%',
      width: '25%'
    });
  });

  test('normalizes forecast data and limits it to five days', () => {
    const forecast = Array.from({ length: 6 }, (_, index) => ({
      day: `Day ${index + 1}`,
      low: '20°',
      high: '25°'
    }));

    const result = getDisplayForecast(forecast);

    expect(result).toHaveLength(5);
    expect(result[0].day).toBe('Today');
    expect(result[1].day).toBe('Day 2');
  });

  test('uses fallback values for an invalid forecast item', () => {
    expect(getDisplayForecast([null])[0]).toMatchObject({
      day: 'Today',
      rain: '0%',
      low: '20°',
      high: '25°'
    });
  });
});

