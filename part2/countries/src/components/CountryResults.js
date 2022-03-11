import CountryData from './CountryData.js';

const CountryResults = ({ countries, query }) => {
  if (query === '') return null;

  const searchResults = countries.filter((country) => {
    const normalizedName = country.name.common.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return normalizedName.includes(normalizedQuery);
  });

  if (searchResults.length > 10) {
    return <p>Too many matches; specify another filter.</p>;
  } else if (searchResults.length > 1) {
    return (
      <ul>
        {searchResults.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else if (searchResults.length === 1) {
    return <CountryData country={searchResults[0]} />;
  } else {
    return <p>No matches; specify another filter.</p>;
  }
};

export default CountryResults;
