import { useEffect, useState } from "react";
import CountrySearch from "./components/CountrySearch";
import SearchResults from "./components/SearchResults";
import countryService from "./services/country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  useEffect(() => {
    if (filter === "") {
      setFilteredCountries([]);
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
        (country.name.official &&
          country.name.official.toLowerCase().includes(filter.toLowerCase())),
    );

    setFilteredCountries(filtered);
  }, [filter, countries]);

  return (
    <>
      <h1>Data for countries</h1>
      <CountrySearch
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onShowCountry={(country) => setSelectedCountry(country)}
      />
      <SearchResults
        countries={filteredCountries}
        filter={filter}
        selectedCountry={selectedCountry}
        handleShowCountry={(c) => setSelectedCountry(c)}
      />
    </>
  );
}

export default App;
