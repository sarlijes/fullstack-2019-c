import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const countriesUrl = 'https://restcountries.eu/rest/v2/all';

  useEffect(() => {
    axios
      .get(countriesUrl)
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        // console.log(response.data);
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setFilteredCountries(
      countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  };

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Display
        countries={filteredCountries}
        setFilter={setFilter}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
};

export default App;