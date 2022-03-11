import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryResults from './components/CountryResults.js';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  return (
    <>
      <p>
        <label>
          Find countries:{' '}
          <input
            type='search'
            value={countryQuery}
            onChange={(evt) => {
              setCountryQuery(evt.target.value);
            }}
            id='query'
          />
        </label>
      </p>

      <CountryResults countries={countries} query={countryQuery} />
    </>
  );
}

export default App;
