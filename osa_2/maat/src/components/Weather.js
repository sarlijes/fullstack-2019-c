import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const API_KEY = process.env.REACT_APP_APIXU_KEY;
  const APIXU_URL = 'https://api.apixu.com/v1/current.json?';
  const [weather, setNewWeather] = useState({
    current: {
      temp_c:'-',
      wind_kph:'-',
      wind_dir:'-',
      condition: {
        icon: ''
      }
    }
  });

  useEffect(() => {
    axios
      .get(`${APIXU_URL}key=${API_KEY}&q=${capital}`)
      .then(response => {
        setNewWeather(response.data);
      });
  }, []);

  // console.log(weather);

  return (
    <div>
      <h1>Wheather in {capital}</h1>
      <p>temperature: {weather.current.temp_c}</p>
      <img src={weather.current.condition.icon} alt= 'empty' width = '100'/>
      <p><strong>wind:</strong> {weather.current.wind_kph} direction {weather.current.wind_dir}</p>
    </div>
  )
};

export default Weather;
