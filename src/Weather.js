import React, { useState } from "react";
import axios from "axios";
import "./App";

export default function Weather(props) {
  let [weather, setWeather] = useState(null);
  let [searchInput, setSearchInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "e431b92ed2815892fadcd7cb0c14d8e8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
  }

  function updateInput(event) {
    event.preventDefault();
    setSearchInput(event.target.value);
  }

  function showWeather(response) {
    setWeather(
      <ul className="weather">
        <li>City: {response.data.name}</li>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {Math.round(response.data.wind.speed)}km/h</li>
        <li>
          <img
            src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />{" "}
        </li>
      </ul>
    );
  }

  return (
    <div className="Weather">
      <h1>Weather Search Engine</h1>
      <form>
        <input
          type="search"
          placeholder="Type a city..."
          onChange={updateInput}
        />
        <button type="submit" value="Search" onClick={handleSubmit}>
          Search
        </button>
      </form>
      {weather}
    </div>
  );
}
