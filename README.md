# �️ Weather App React

A modern, feature-rich weather application built with React that provides comprehensive weather information with a focus on Indian cities and locations.

## 🚀 Features

### 🌍 **Real-Time Weather Data**
- **Current Weather**: Live temperature, weather conditions, humidity, and more
- **5-Day Forecast**: Detailed daily forecasts with temperature ranges and conditions
- **24-Hour Timeline**: Complete hourly weather progression from current time
- **Multiple Cities**: Add and track weather for multiple cities simultaneously

### 🇮🇳 **India-Focused**
- **Enhanced Indian City Search**: Optimized search for Indian cities including smaller towns
- **Regional Coverage**: Support for cities like Indore, Mumbai, Delhi, Bangalore, Chennai, and many more
- **Local Area Details**: Shows nearby locations and areas for precipitation maps
- **Default Location**: Indore set as the home city

### 📱 **Interactive Features**
- **Smart Search**: Multiple search strategies to find even smaller cities like Rau, Dewas, etc.
- **Favorite Cities**: Save and quickly switch between your preferred locations
- **Weather Alerts**: Important weather notifications and warnings
- **Precipitation Map**: Visual representation of rainfall with local area markers

### 🎯 **Intelligent Suggestions**
- **Personalized Recommendations**: Weather-based suggestions for:
  - 👕 **Clothing**: What to wear based on temperature and conditions
  - 🏃 **Activities**: Suitable outdoor/indoor activities
  - 🍽️ **Food & Drinks**: Weather-appropriate meal suggestions
  - 🧳 **Gear**: Essential items to carry
  - 🚗 **Travel**: Travel tips and precautions
  - 💚 **Health**: Health and comfort recommendations

### 🎨 **Modern UI/UX**
- **Glass Morphism Design**: Beautiful, modern interface with transparency effects
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Rain animations and smooth transitions
- **Dark Theme**: Elegant dark color scheme optimized for readability
- **Intuitive Navigation**: Easy-to-use sidebar and main content areas

### ⚡ **Performance & Reliability**
- **API Caching**: 10-minute cache system for optimal performance
- **Error Handling**: Comprehensive error boundaries and fallback mechanisms
- **Offline Fallback**: Graceful degradation when network is unavailable
- **Real-Time Updates**: Fresh data with manual refresh capability

## 🛠️ Technologies Used

- **Frontend**: React 19.1.0 with functional components and hooks
- **Styling**: CSS3 with modern features (Grid, Flexbox, Glass Morphism)
- **API**: OpenWeatherMap API for real-time weather data
- **State Management**: React useState and useEffect hooks
- **Architecture**: Component-based modular design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather?units=metric&q=
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
   REACT_APP_FORECAST_API_URL=https://api.openweathermap.org/data/2.5/forecast?units=metric&q=
   ```

4. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key
   - Replace `your_openweathermap_api_key_here` in the `.env` file

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
weather-app-react/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.js      # Error handling component
│   │   ├── FavoriteCities.js     # Saved cities management
│   │   ├── ForecastSection.js    # 5-day weather forecast
│   │   ├── HourlyForecast.js     # 24-hour timeline
│   │   ├── MainContent.js        # Main weather display
│   │   ├── PrecipitationSection.js # Rain/precipitation map
│   │   ├── RainAnimation.js      # Rain visual effects
│   │   ├── Sidebar.js            # Search and navigation
│   │   ├── WeatherAlerts.js      # Weather warnings
│   │   ├── WeatherDetails.js     # Detailed weather info
│   │   ├── WeatherSettings.js    # App settings
│   │   └── WeatherSuggestions.js # AI-powered suggestions
│   ├── services/
│   │   └── weatherAPI.js         # API service layer
│   ├── App.js                    # Main application component
│   ├── App.css                   # Global styles
│   └── index.js                  # Application entry point
├── .env                          # Environment variables
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## � Usage

### **Adding Cities**
1. Use the search bar in the sidebar
2. Type any city name (works great with Indian cities)
3. Select from the search results
4. The city will be added to your favorites automatically

### **Viewing Weather Details**
- **Current Weather**: Main temperature and conditions displayed prominently
- **Hourly Forecast**: Scroll horizontally through the 24-hour timeline
- **5-Day Forecast**: View extended forecast with temperature ranges
- **Suggestions**: Expand the suggestions section for personalized recommendations

### **Managing Cities**
- Click on any saved city in the sidebar to switch views
- Remove cities using the delete option
- The home city (Indore) is marked with a special indicator

## 🌟 Key Features Breakdown

### **Search Capabilities**
- **Enhanced Indian Search**: Multiple search strategies for better city discovery
- **Fallback Mechanisms**: Tries different query combinations to find smaller cities
- **Real-time Results**: Instant search results as you type

### **Weather Intelligence**
- **Condition Analysis**: Analyzes temperature, humidity, and weather conditions
- **Smart Recommendations**: Contextual suggestions based on current weather
- **Local Insights**: Area-specific information for precipitation and alerts

### **Visual Design**
- **Glass Morphism**: Modern transparent design elements
- **Responsive Grids**: Adapts to different screen sizes seamlessly
- **Color Coding**: Weather conditions represented with appropriate colors and icons

## 🔧 Configuration

### **API Settings**
The app uses OpenWeatherMap API with the following endpoints:
- Current Weather: `/data/2.5/weather`
- 5-Day Forecast: `/data/2.5/forecast`

### **Caching**
- **Cache Duration**: 10 minutes for optimal balance between freshness and performance
- **Storage**: In-memory caching for the current session

### **Default Settings**
- **Home City**: Indore, India
- **Units**: Metric (Celsius, km/h)
- **Language**: English
- **Theme**: Dark mode

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing the weather API
- **React Team** for the amazing framework
- **Indian Weather Service** for regional weather insights
- **Community Contributors** for testing and feedback

## 📞 Support

If you encounter any issues or have suggestions:
1. Check the browser console for any error messages
2. Ensure your API key is correctly set in the `.env` file
3. Verify your internet connection
4. Open an issue on GitHub with detailed information

---

**Built with ❤️ via Aashish Jha and Subham Sangwan for weather enthusiasts and React developers**

*Stay informed, stay prepared! 🌦️*

### 🌡️ Weather Information
- **Real-time Weather Data** - Live weather updates via OpenWeatherMap API
- **Detailed Metrics** - Temperature, humidity, wind speed, pressure, visibility
- **Hourly Forecasts** - Hour-by-hour weather predictions
- **Weather Alerts** - Smart notifications for weather conditions
- **Air Quality Index** - Environmental health indicators

### 🎯 Advanced Features
- **Favorites System** - Bookmark frequently checked cities
- **Settings Panel** - Customize units and preferences
- **Auto-refresh** - Configurable automatic data updates
- **Offline Fallback** - Works with cached data when API is unavailable
- **Responsive Design** - Optimized for desktop, tablet, and mobile

### 🎨 User Interface
- **Modern Design** - Glass morphism effects and smooth animations
- **Dark Theme** - Weather-adaptive backgrounds
- **Rain Animation** - Dynamic weather effects
- **Keyboard Navigation** - Full keyboard accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ installed
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your OpenWeatherMap API key:
   ```env
   REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather?units=metric&q=
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   REACT_APP_FORECAST_API_URL=https://api.openweathermap.org/data/2.5/forecast?units=metric&q=
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🔑 API Setup

### Getting OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API Keys section
4. Copy your API key
5. Add it to your `.env` file

### API Features Used
- **Current Weather API** - Real-time weather conditions
- **5-day Forecast API** - Extended weather predictions
- **Geocoding** - City name to coordinates conversion

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FavoriteCities.js      # Favorites management
│   ├── ForecastSection.js     # 5-day weather forecast
│   ├── HourlyForecast.js      # Hourly weather data
│   ├── MainContent.js         # Main weather display
│   ├── PrecipitationSection.js # Precipitation map
│   ├── RainAnimation.js       # Weather animations
│   ├── Sidebar.js             # City search and list
│   ├── WeatherAlerts.js       # Weather warnings
│   ├── WeatherDetails.js      # Detailed weather metrics
│   └── WeatherSettings.js     # App preferences
├── data/
│   └── weatherData.js         # Fallback weather data
├── services/
│   └── weatherAPI.js          # OpenWeatherMap integration
├── App.js                     # Main application component
├── App.css                    # Application styles
└── index.js                   # React entry point
```

## 🔧 Configuration

### Environment Variables
- `REACT_APP_WEATHER_API_URL` - OpenWeatherMap current weather endpoint
- `REACT_APP_WEATHER_API_KEY` - Your API key
- `REACT_APP_FORECAST_API_URL` - OpenWeatherMap forecast endpoint

### Settings Options
- **Temperature Units** - Celsius/Fahrenheit
- **Wind Speed Units** - km/h, mph, m/s
- **Pressure Units** - hPa, inHg, mmHg
- **Time Format** - 12/24 hour
- **Auto Refresh** - Automatic data updates
- **Notifications** - Weather alerts

## 🌟 Usage

### Adding Cities
1. Type city name in search box
2. Select from dropdown suggestions
3. City automatically added with live weather data

### Managing Favorites
1. Click star icon next to city name
2. Access favorites from collapsible panel
3. Quick navigation to favorite cities

### Viewing Weather Details
- **Main Display** - Current temperature and conditions
- **Hourly Forecast** - Scroll through hourly predictions
- **Weather Alerts** - Automatic warnings and advisories
- **Detailed Metrics** - Comprehensive weather information

### Refreshing Data
- Click refresh button for latest weather
- Auto-refresh available in settings
- Fallback to cached data if API unavailable

## 🛠️ Development

### Available Scripts
- `npm start` - Development server
- `npm build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding New Features
1. Create component in `src/components/`
2. Add styles to `App.css`
3. Import and use in main components
4. Update API service if needed

## 🔍 Troubleshooting

### Common Issues

**API Key Error**
- Ensure API key is correctly set in `.env` file
- Verify API key is active on OpenWeatherMap dashboard

**City Not Found**
- Check spelling of city name
- Try adding country code (e.g., "Mumbai,IN")
- Some cities may have different names in the API

**Loading Issues**
- Check internet connection
- Verify API endpoint URLs in `.env`
- Clear browser cache and restart

### Fallback Mode
If API is unavailable, the app automatically uses:
- Cached data from previous sessions
- Simulated weather data for new cities
- Basic weather patterns for demonstration

## 📱 Responsive Design

The app is fully responsive and works on:
- **Desktop** - Full feature set with multiple panels
- **Tablet** - Optimized layout with collapsible sections
- **Mobile** - Touch-friendly interface with swipe gestures

## 🎨 Themes

### Weather-Adaptive Backgrounds
- **Rainy Weather** - Dark blue gradients with rain animation
- **Sunny Weather** - Warm orange/yellow gradients
- **Cloudy Weather** - Cool blue/gray gradients
- **Default** - Modern dark theme

## 🔄 Data Caching

- **10-minute cache** for API responses
- **localStorage** for user preferences
- **Fallback data** for offline functionality
- **Smart refresh** to minimize API calls

## 📊 Performance

### Optimizations
- Component memoization for expensive renders
- API response caching to reduce requests
- Lazy loading for non-critical components
- Efficient state management with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Weather data provider
- **React** - Frontend framework
- **Create React App** - Project bootstrap
- **Indian Cities Database** - Comprehensive city listings

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check troubleshooting guide above
- Review OpenWeatherMap API documentation

---

**Enjoy exploring weather conditions across India and the world! 🌍**
