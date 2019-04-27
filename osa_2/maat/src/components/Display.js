import React from "react";
import Country from "./Country";
import Countries from "./Countries";

const Display = ({ countries, setFilter, setFilteredCountries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 0) {
    return <div>No countries matching the search</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <Countries countries={countries} setFilter={setFilter} setFilteredCountries={setFilteredCountries} />;
  }
};

export default Display;
