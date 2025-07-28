import React, { useState, useEffect } from 'react';
import weatherAPI from '../services/weatherAPI';

const WeatherTest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing weatherAPI...');
        const result = await weatherAPI.getCurrentWeather('Mumbai', 'IN');
        console.log('API Test Result:', result);
        setData(result);
      } catch (err) {
        console.error('API Test Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div>Testing API...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (data) return <div style={{color: 'green'}}>API works! City: {data.name}, Temp: {data.temp}</div>;

  return <div>No data</div>;
};

export default WeatherTest;
