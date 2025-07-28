import React from 'react';

const PrecipitationSection = ({ cityData }) => {
  // Generate nearby locations based on the current city
  const generateNearbyLocations = (cityName) => {
    // Normalize city name for better matching
    const normalizeCity = (name) => {
      return name?.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^\w]/g, '');
    };
    
    const normalizedInput = normalizeCity(cityName);
    
    const locationSets = {
      // Maharashtra cities - with variations
      mumbai: [
        { name: "Thane", style: { top: "15%", left: "60%" } },
        { name: "Navi Mumbai", style: { top: "25%", right: "15%" } },
        { name: "Kalyan", style: { top: "15%", left: "25%" } },
        { name: "Vasai", style: { bottom: "35%", right: "20%" } },
        { name: "Panvel", style: { bottom: "25%", left: "15%" } },
        { name: "Badlapur", style: { bottom: "25%", right: "10%" } },
        { name: "Virar", style: { bottom: "15%", left: "25%" } },
        { name: "Ulhasnagar", style: { bottom: "20%", left: "35%" } }
      ],
      pune: [
        { name: "Junnar", style: { top: "15%", left: "60%" } },
        { name: "Bhalwani", style: { top: "25%", right: "15%" } },
        { name: "Mathejan", style: { top: "15%", left: "25%" } },
        { name: "Shirur", style: { bottom: "35%", right: "20%" } },
        { name: "Lonavala", style: { bottom: "25%", left: "15%" } },
        { name: "Daund", style: { bottom: "25%", right: "10%" } },
        { name: "Pirangut", style: { bottom: "15%", left: "25%" } },
        { name: "Lavasa", style: { bottom: "20%", left: "35%" } }
      ],
      nagpur: [
        { name: "Wardha", style: { top: "15%", left: "60%" } },
        { name: "Kamptee", style: { top: "25%", right: "15%" } },
        { name: "Katol", style: { top: "15%", left: "25%" } },
        { name: "Umred", style: { bottom: "35%", right: "20%" } },
        { name: "Parseoni", style: { bottom: "25%", left: "15%" } },
        { name: "Hingna", style: { bottom: "25%", right: "10%" } },
        { name: "Saoner", style: { bottom: "15%", left: "25%" } },
        { name: "Kuhi", style: { bottom: "20%", left: "35%" } }
      ],
      nashik: [
        { name: "Trimbak", style: { top: "15%", left: "60%" } },
        { name: "Sinnar", style: { top: "25%", right: "15%" } },
        { name: "Igatpuri", style: { top: "15%", left: "25%" } },
        { name: "Kalwan", style: { bottom: "35%", right: "20%" } },
        { name: "Yeola", style: { bottom: "25%", left: "15%" } },
        { name: "Manmad", style: { bottom: "25%", right: "10%" } },
        { name: "Ghoti", style: { bottom: "15%", left: "25%" } },
        { name: "Surgana", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Delhi and NCR - with variations
      delhi: [
        { name: "Gurgaon", style: { top: "15%", left: "60%" } },
        { name: "Noida", style: { top: "25%", right: "15%" } },
        { name: "Faridabad", style: { top: "15%", left: "25%" } },
        { name: "Ghaziabad", style: { bottom: "35%", right: "20%" } },
        { name: "Dwarka", style: { bottom: "25%", left: "15%" } },
        { name: "Rohini", style: { bottom: "25%", right: "10%" } },
        { name: "Lajpat Nagar", style: { bottom: "15%", left: "25%" } },
        { name: "Janakpuri", style: { bottom: "20%", left: "35%" } }
      ],
      newdelhi: [
        { name: "Gurgaon", style: { top: "15%", left: "60%" } },
        { name: "Noida", style: { top: "25%", right: "15%" } },
        { name: "Faridabad", style: { top: "15%", left: "25%" } },
        { name: "Ghaziabad", style: { bottom: "35%", right: "20%" } },
        { name: "Connaught Place", style: { bottom: "25%", left: "15%" } },
        { name: "Karol Bagh", style: { bottom: "25%", right: "10%" } },
        { name: "Lajpat Nagar", style: { bottom: "15%", left: "25%" } },
        { name: "Rajouri Garden", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Karnataka cities - with variations
      bangalore: [
        { name: "Mysore", style: { top: "15%", left: "60%" } },
        { name: "Tumkur", style: { top: "25%", right: "15%" } },
        { name: "Hosur", style: { top: "15%", left: "25%" } },
        { name: "Kolar", style: { bottom: "35%", right: "20%" } },
        { name: "Chikballapur", style: { bottom: "25%", left: "15%" } },
        { name: "Ramanagara", style: { bottom: "25%", right: "10%" } },
        { name: "Devanahalli", style: { bottom: "15%", left: "25%" } },
        { name: "Whitefield", style: { bottom: "20%", left: "35%" } }
      ],
      bengaluru: [
        { name: "Mysore", style: { top: "15%", left: "60%" } },
        { name: "Tumkur", style: { top: "25%", right: "15%" } },
        { name: "Hosur", style: { top: "15%", left: "25%" } },
        { name: "Kolar", style: { bottom: "35%", right: "20%" } },
        { name: "Chikballapur", style: { bottom: "25%", left: "15%" } },
        { name: "Ramanagara", style: { bottom: "25%", right: "10%" } },
        { name: "Electronic City", style: { bottom: "15%", left: "25%" } },
        { name: "Whitefield", style: { bottom: "20%", left: "35%" } }
      ],
      mysore: [
        { name: "Mandya", style: { top: "15%", left: "60%" } },
        { name: "Hassan", style: { top: "25%", right: "15%" } },
        { name: "Chamarajanagar", style: { top: "15%", left: "25%" } },
        { name: "Hunsur", style: { bottom: "35%", right: "20%" } },
        { name: "Srirangapatna", style: { bottom: "25%", left: "15%" } },
        { name: "Nanjangud", style: { bottom: "25%", right: "10%" } },
        { name: "T. Narasipura", style: { bottom: "15%", left: "25%" } },
        { name: "Bannur", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Madhya Pradesh cities - with variations
      indore: [
        { name: "Rau", style: { top: "15%", left: "60%" } },
        { name: "Dewas", style: { top: "25%", right: "15%" } },
        { name: "Ujjain", style: { top: "15%", left: "25%" } },
        { name: "Pithampur", style: { bottom: "35%", right: "20%" } },
        { name: "Sanwer", style: { bottom: "25%", left: "15%" } },
        { name: "Mhow", style: { bottom: "25%", right: "10%" } },
        { name: "Khargone", style: { bottom: "15%", left: "25%" } },
        { name: "Simrol", style: { bottom: "20%", left: "35%" } }
      ],
      bhopal: [
        { name: "Raisen", style: { top: "15%", left: "60%" } },
        { name: "Vidisha", style: { top: "25%", right: "15%" } },
        { name: "Sehore", style: { top: "15%", left: "25%" } },
        { name: "Berasia", style: { bottom: "35%", right: "20%" } },
        { name: "Hoshangabad", style: { bottom: "25%", left: "15%" } },
        { name: "Mandideep", style: { bottom: "25%", right: "10%" } },
        { name: "Bairagarh", style: { bottom: "15%", left: "25%" } },
        { name: "Kolar", style: { bottom: "20%", left: "35%" } }
      ],
      gwalior: [
        { name: "Morena", style: { top: "15%", left: "60%" } },
        { name: "Bhind", style: { top: "25%", right: "15%" } },
        { name: "Datia", style: { top: "15%", left: "25%" } },
        { name: "Shivpuri", style: { bottom: "35%", right: "20%" } },
        { name: "Antri", style: { bottom: "25%", left: "15%" } },
        { name: "Dabra", style: { bottom: "25%", right: "10%" } },
        { name: "Bhitarwar", style: { bottom: "15%", left: "25%" } },
        { name: "Morar", style: { bottom: "20%", left: "35%" } }
      ],
      jabalpur: [
        { name: "Katni", style: { top: "15%", left: "60%" } },
        { name: "Narsinghpur", style: { top: "25%", right: "15%" } },
        { name: "Seoni", style: { top: "15%", left: "25%" } },
        { name: "Mandla", style: { bottom: "35%", right: "20%" } },
        { name: "Sihora", style: { bottom: "25%", left: "15%" } },
        { name: "Patan", style: { bottom: "25%", right: "10%" } },
        { name: "Panagar", style: { bottom: "15%", left: "25%" } },
        { name: "Barela", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Gujarat cities - with variations
      ahmedabad: [
        { name: "Gandhinagar", style: { top: "15%", left: "60%" } },
        { name: "Mehsana", style: { top: "25%", right: "15%" } },
        { name: "Anand", style: { top: "15%", left: "25%" } },
        { name: "Vadodara", style: { bottom: "35%", right: "20%" } },
        { name: "Kheda", style: { bottom: "25%", left: "15%" } },
        { name: "Sanand", style: { bottom: "25%", right: "10%" } },
        { name: "Bavla", style: { bottom: "15%", left: "25%" } },
        { name: "Dholka", style: { bottom: "20%", left: "35%" } }
      ],
      surat: [
        { name: "Navsari", style: { top: "15%", left: "60%" } },
        { name: "Bharuch", style: { top: "25%", right: "15%" } },
        { name: "Valsad", style: { top: "15%", left: "25%" } },
        { name: "Ankleshwar", style: { bottom: "35%", right: "20%" } },
        { name: "Vapi", style: { bottom: "25%", left: "15%" } },
        { name: "Bardoli", style: { bottom: "25%", right: "10%" } },
        { name: "Kadodara", style: { bottom: "15%", left: "25%" } },
        { name: "Udhna", style: { bottom: "20%", left: "35%" } }
      ],
      vadodara: [
        { name: "Anand", style: { top: "15%", left: "60%" } },
        { name: "Bharuch", style: { top: "25%", right: "15%" } },
        { name: "Godhra", style: { top: "15%", left: "25%" } },
        { name: "Nadiad", style: { bottom: "35%", right: "20%" } },
        { name: "Petlad", style: { bottom: "25%", left: "15%" } },
        { name: "Karjan", style: { bottom: "25%", right: "10%" } },
        { name: "Padra", style: { bottom: "15%", left: "25%" } },
        { name: "Dabhoi", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Tamil Nadu cities - with variations
      chennai: [
        { name: "Kanchipuram", style: { top: "15%", left: "60%" } },
        { name: "Tiruvallur", style: { top: "25%", right: "15%" } },
        { name: "Chengalpattu", style: { top: "15%", left: "25%" } },
        { name: "Mahabalipuram", style: { bottom: "35%", right: "20%" } },
        { name: "Tambaram", style: { bottom: "25%", left: "15%" } },
        { name: "Avadi", style: { bottom: "25%", right: "10%" } },
        { name: "Porur", style: { bottom: "15%", left: "25%" } },
        { name: "OMR", style: { bottom: "20%", left: "35%" } }
      ],
      coimbatore: [
        { name: "Tirupur", style: { top: "15%", left: "60%" } },
        { name: "Salem", style: { top: "25%", right: "15%" } },
        { name: "Erode", style: { top: "15%", left: "25%" } },
        { name: "Ooty", style: { bottom: "35%", right: "20%" } },
        { name: "Pollachi", style: { bottom: "25%", left: "15%" } },
        { name: "Mettupalayam", style: { bottom: "25%", right: "10%" } },
        { name: "Annur", style: { bottom: "15%", left: "25%" } },
        { name: "Sulur", style: { bottom: "20%", left: "35%" } }
      ],
      madurai: [
        { name: "Dindigul", style: { top: "15%", left: "60%" } },
        { name: "Theni", style: { top: "25%", right: "15%" } },
        { name: "Virudhunagar", style: { top: "15%", left: "25%" } },
        { name: "Sivaganga", style: { bottom: "35%", right: "20%" } },
        { name: "Usilampatti", style: { bottom: "25%", left: "15%" } },
        { name: "Melur", style: { bottom: "25%", right: "10%" } },
        { name: "Vadipatti", style: { bottom: "15%", left: "25%" } },
        { name: "Sholavandan", style: { bottom: "20%", left: "35%" } }
      ],
      
      // West Bengal cities - with variations
      kolkata: [
        { name: "Howrah", style: { top: "15%", left: "60%" } },
        { name: "Barrackpore", style: { top: "25%", right: "15%" } },
        { name: "Dum Dum", style: { top: "15%", left: "25%" } },
        { name: "Salt Lake", style: { bottom: "35%", right: "20%" } },
        { name: "Rajarhat", style: { bottom: "25%", left: "15%" } },
        { name: "Behala", style: { bottom: "25%", right: "10%" } },
        { name: "Tollygunge", style: { bottom: "15%", left: "25%" } },
        { name: "Park Street", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Rajasthan cities - with variations
      jaipur: [
        { name: "Ajmer", style: { top: "15%", left: "60%" } },
        { name: "Alwar", style: { top: "25%", right: "15%" } },
        { name: "Sikar", style: { top: "15%", left: "25%" } },
        { name: "Tonk", style: { bottom: "35%", right: "20%" } },
        { name: "Dausa", style: { bottom: "25%", left: "15%" } },
        { name: "Chomu", style: { bottom: "25%", right: "10%" } },
        { name: "Sanganer", style: { bottom: "15%", left: "25%" } },
        { name: "Bagru", style: { bottom: "20%", left: "35%" } }
      ],
      jodhpur: [
        { name: "Bikaner", style: { top: "15%", left: "60%" } },
        { name: "Barmer", style: { top: "25%", right: "15%" } },
        { name: "Pali", style: { top: "15%", left: "25%" } },
        { name: "Nagaur", style: { bottom: "35%", right: "20%" } },
        { name: "Osian", style: { bottom: "25%", left: "15%" } },
        { name: "Balesar", style: { bottom: "25%", right: "10%" } },
        { name: "Mandore", style: { bottom: "15%", left: "25%" } },
        { name: "Bilara", style: { bottom: "20%", left: "35%" } }
      ],
      
      // Uttar Pradesh cities - with variations
      lucknow: [
        { name: "Kanpur", style: { top: "15%", left: "60%" } },
        { name: "Unnao", style: { top: "25%", right: "15%" } },
        { name: "Rae Bareli", style: { top: "15%", left: "25%" } },
        { name: "Sitapur", style: { bottom: "35%", right: "20%" } },
        { name: "Hardoi", style: { bottom: "25%", left: "15%" } },
        { name: "Barabanki", style: { bottom: "25%", right: "10%" } },
        { name: "Mohanlalganj", style: { bottom: "15%", left: "25%" } },
        { name: "Malihabad", style: { bottom: "20%", left: "35%" } }
      ],
      kanpur: [
        { name: "Lucknow", style: { top: "15%", left: "60%" } },
        { name: "Unnao", style: { top: "25%", right: "15%" } },
        { name: "Fatehpur", style: { top: "15%", left: "25%" } },
        { name: "Etawah", style: { bottom: "35%", right: "20%" } },
        { name: "Auraiya", style: { bottom: "25%", left: "15%" } },
        { name: "Bithoor", style: { bottom: "25%", right: "10%" } },
        { name: "Ghatampur", style: { bottom: "15%", left: "25%" } },
        { name: "Bilhaur", style: { bottom: "20%", left: "35%" } }
      ],
      varanasi: [
        { name: "Allahabad", style: { top: "15%", left: "60%" } },
        { name: "Mirzapur", style: { top: "25%", right: "15%" } },
        { name: "Jaunpur", style: { top: "15%", left: "25%" } },
        { name: "Ghazipur", style: { bottom: "35%", right: "20%" } },
        { name: "Chandauli", style: { bottom: "25%", left: "15%" } },
        { name: "Ramnagar", style: { bottom: "25%", right: "10%" } },
        { name: "Sarnath", style: { bottom: "15%", left: "25%" } },
        { name: "Cholapur", style: { bottom: "20%", left: "35%" } }
      ]
    };

    // First try exact normalized match
    let locations = locationSets[normalizedInput];
    
    // If not found, try partial matching
    if (!locations) {
      for (const [key, value] of Object.entries(locationSets)) {
        if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
          locations = value;
          break;
        }
      }
    }
    
    // Return found locations or generic ones
    return locations || [
      { name: `${cityName} East`, style: { top: "15%", left: "70%" } },
      { name: `${cityName} West`, style: { top: "25%", left: "20%" } },
      { name: `${cityName} North`, style: { top: "10%", left: "45%" } },
      { name: `${cityName} South`, style: { bottom: "10%", left: "45%" } },
      { name: `${cityName} Center`, style: { top: "45%", left: "45%" } },
      { name: "Suburb 1", style: { bottom: "25%", right: "15%" } },
      { name: "Suburb 2", style: { bottom: "35%", left: "25%" } },
      { name: "Outskirts", style: { bottom: "20%", right: "25%" } }
    ];
  };

  const mapLocations = generateNearbyLocations(cityData?.name);
  
  // Get precipitation chance from weather data
  const precipitationChance = cityData?.hourly?.[0]?.rain || 
                             (cityData?.condition?.toLowerCase().includes('rain') ? '75%' : '25%');

  return (
    <div className="precipitation-section">
      <h3>💧 PRECIPITATION</h3>
      <div className="precipitation-map">
        {mapLocations.map((location, index) => (
          <div
            key={index}
            className="map-location"
            style={location.style}
          >
            {location.name}
          </div>
        ))}
        
        <div className="current-location">
          <div className="location-pin">{precipitationChance.replace('%', '')}</div>
          <div className="location-label">{cityData?.name || 'My Location'}</div>
        </div>
      </div>
      <div className="precipitation-info">
        <p>Precipitation chance in the next hour: <strong>{precipitationChance}</strong></p>
        <p>Humidity: <strong>{cityData?.humidity || 'N/A'}</strong></p>
      </div>
    </div>
  );
};

export default PrecipitationSection;
