import { useEffect, useState } from "react";
import CountrySearch from "./components/CountrySearch";
import SearchResults from "./components/SearchResults";
import countryService from "./services/country";

function App() {
  const [countries, setCountries] = useState([]); // Список всех стран с сервера
  const [filter, setFilter] = useState(""); // Строка поиска
  const [filteredCountries, setFilteredCountries] = useState([]);

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
      />
      <SearchResults countries={filteredCountries} filter={filter} />
    </>
  );
}

export default App;
