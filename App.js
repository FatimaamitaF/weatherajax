import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(null);

  function search() {
    if (inputCity.trim() === "") {
      alert("Please insert city name!");
      return;
    }

    const apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setCity(response.data.name);
        setTemp(response.data.main.temp);
        setError(null);
      })
      .catch(() => {
        setError("City not found or API error");
        setCity("");
        setTemp(null);
      });
  }

  return (
    <div className="App">
      <h2>Weather search engine</h2>
      <input
        type="text"
        placeholder="city name"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {temp !== null && !error && (
        <p>
          It's {temp.toFixed(1)}°C in {city}
        </p>
      )}
    </div>
  );
}
