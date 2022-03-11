import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ city }) => {
  return !city ? null : (
    <>
      <p>Temperature: {city.main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={`Weather icon for ${city.weather.description}`}
        width={100}
      />
      <p>Wind: {city.wind.speed} m/s</p>
    </>
  );
};

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState();
  const [isFetchError, setIsFetchError] = useState(false);

  useEffect(() => {
    let isCanceled = false;

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},${country.cca3}&limit=1&appid=${API_KEY}`
      )
      .then((res) => {
        const [lat, lon] = [res.data[0].lat, res.data[0].lon];
        return axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
      })
      .then((res) => {
        if (!isCanceled) {
          setWeather(res.data);
          setIsFetchError(false);
        }
      })
      .catch((err) => {
        setIsFetchError(true);
      });

    return () => {
      isCanceled = true;
    };
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>

      <p>Capital: {country.capital[0]}</p>
      <p>
        Area: {country.area} km<sup>2</sup>
      </p>
      <p>Languages:</p>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width={320}
        style={{
          padding: '0.5em',
          border: '1px solid black',
          borderRadius: '0.5em',
        }}
      />

      <h2>Weather in {country.capital[0]}</h2>
      {isFetchError ? (
        <p>Error fetching weather data.</p>
      ) : (
        <Weather city={weather} />
      )}
    </>
  );
};

export default CountryData;
