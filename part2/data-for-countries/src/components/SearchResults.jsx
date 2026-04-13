const SearchResults = ({ countries, filter }) => {
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
          <p key={country.cca3}>{country.name.common}</p>
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return (
      <div>
        {countries.map((country) => (
          <>
          <h2 key={country.cca3}>{country.name.official}</h2>
          <p>Сapital <b>{country.capital}</b></p>
          <p>Area <b>{country.area}</b> км<sup>2</sup></p>
          </>
        ))}
      </div>
    );
  }

};

export default SearchResults;
