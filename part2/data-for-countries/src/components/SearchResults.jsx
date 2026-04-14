const SearchResults = ({ countries, filter, selectedCountry, handleShowCountry }) => {
  
  if (!filter) {
    return <p>Start typing to search for countries...</p>;
  }

  if (countries.length === 0) {
    return <p>No countries found matching "{filter}"</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>
            <span>{country.name.common} </span>
            {/* Функция handleShowCountry пришла из App */}
            <button onClick={() => handleShowCountry(country)}>Show</button>
          </div>
        ))}

        {selectedCountry && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray' }}>
            <h3>{selectedCountry.name.official}</h3>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area} km²</p>
          </div>
        )}
      </div>
    );
  }

  if (countries.length === 1) {
    const country = countries[0]; 
    return (
      <div key={country.cca3}>
        <h2>{country.name.official}</h2>
        <p>Capital <b>{country.capital}</b></p>
        <p>Area <b>{country.area}</b> км<sup>2</sup></p>
      </div>
    );
  }

  return null;
};


export default SearchResults;
