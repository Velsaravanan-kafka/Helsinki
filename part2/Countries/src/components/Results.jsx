import React from 'react';

const CountryDetail = ({ country, weather }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} km²</p>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      width="150"
    />
    {weather && (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {weather.main.temp} °C</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>
);

const CountryList = ({ countries, handleShowClick }) => (
  <div>
    {countries.map(country => (
      <div key={country.cca3}>
        {country.name.common}{' '}
        <button onClick={() => handleShowClick(country.name.common)}>
          show
        </button>
      </div>
    ))}
  </div>
);

const Results = ({ countries, handleShowClick, weather }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <CountryList countries={countries} handleShowClick={handleShowClick} />
    );
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} weather={weather} />;
  }

  return null; // Render nothing if no matches
};

export default Results;