import React, { useState, useEffect } from 'react';
import countryService from './services/countries';
import weatherService from './services/weather';


import Results from './components/Results';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then(initialCountries => {
      setCountries(initialCountries);
    });
  }, []);

  const countriesToShow = filter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const capital = countriesToShow[0].capital[0];
      const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

      weatherService.getForCapital(capital, apiKey).then(weatherData => {
        setWeather(weatherData);
      });
    } else {
      setWeather(null); // Reset weather if not a single country
    }
  }, [countriesToShow]); // Re-run when the filtered list changes

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Results
        countries = {countriesToShow}
        handleShowClick={setFilter} // Pass setFilter directly
        weather={weather}
      />
    </div>
  );
};

export default App;