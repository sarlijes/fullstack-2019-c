import React from 'react';

const Countries = ({ countries, setFilter, setFilteredCountries }) =>

  (
    <div>
      {countries.map(country => (
        <div key={country.numericCode}>
          {country.name}
          <Button
            country={country}
            setFilter={setFilter}
            setFilteredCountries={setFilteredCountries}
          />
        </div>
      ))}
    </div>
  )


const Button = ({ country, setFilter, setFilteredCountries }) => {
  const showCountry = () => {
    setFilter(country.name);
    setFilteredCountries([country]);
  };
  return <button onClick={showCountry}>show</button>;
};

export default Countries;