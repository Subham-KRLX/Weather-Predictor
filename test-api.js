// Test API connection
const testAPI = async () => {
  const API_KEY = 'da315e8607cdee7c90ef350b0f5e7027';
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Indore,IN&appid=${API_KEY}`;
  
  console.log('Testing API URL:', url);
  
  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('Success! Weather data:', data);
    console.log('City:', data.name);
    console.log('Temperature:', data.main.temp);
    console.log('Condition:', data.weather[0].main);
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

testAPI();
