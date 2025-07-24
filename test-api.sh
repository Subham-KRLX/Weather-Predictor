#!/bin/bash

echo "🌦️ Testing Weather App API Integration"
echo "======================================="

# Check if .env file exists and has API key
if [ -f ".env" ]; then
    echo "✅ .env file found"
    if grep -q "REACT_APP_WEATHER_API_KEY=da315e8607cdee7c90ef350b0f5e7027" .env; then
        echo "✅ API key is set correctly"
    else
        echo "❌ API key not found in .env"
        exit 1
    fi
else
    echo "❌ .env file not found"
    exit 1
fi

# Test API directly
echo ""
echo "Testing API directly..."
response=$(curl -s "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Pune,IN&appid=da315e8607cdee7c90ef350b0f5e7027")

if echo "$response" | grep -q '"name":"Pune"'; then
    echo "✅ API is working correctly"
    echo "Current temperature in Pune: $(echo "$response" | grep -o '"temp":[0-9.]*' | cut -d':' -f2)°C"
else
    echo "❌ API test failed"
    echo "Response: $response"
    exit 1
fi

echo ""
echo "🚀 Starting React app..."
echo "The app should now load with real weather data!"
echo "Open http://localhost:3000 in your browser"

# Start the React app
npm start
