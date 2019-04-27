import React from 'react';
import Weather from './Weather';

const Country = ({ country }) =>  (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt= 'empty' width = '100'/>
      <Weather country={country.name} capital={country.capital} />
    </div>
  )

export default Country;