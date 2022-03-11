const CountryData = ({ country }) => {
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
    </>
  );
};

export default CountryData;
