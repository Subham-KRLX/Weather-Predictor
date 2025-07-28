// Simple API test - you can run this in browser console
import weatherAPI from './services/weatherAPI';

export const testAPI = async () => {
  try {
    console.log('Testing API with your key...');
    const mumbaiWeather = await weatherAPI.getCurrentWeather('Mumbai', 'IN');
    console.log('Mumbai weather:', mumbaiWeather);
    
    const puneWeather = await weatherAPI.getCurrentWeather('Pune', 'IN');
    console.log('Pune weather:', puneWeather);
    
    return { mumbaiWeather, puneWeather };
  } catch (error) {
    console.error('API Test failed:', error);
    return { error: error.message };
  }
};

// Add this to window for easy testing
if (typeof window !== 'undefined') {
  window.testWeatherAPI = testAPI;
}
