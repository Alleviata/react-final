import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import IconManager from "./IconManager";
import TempConversion from "./TempConversion";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  let [visibility, setVisibility] = useState("hidden");

  function showWeather(response) {
    setVisibility("hidden");
    setWeatherData({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
    });
  }

  function search() {
    let apiKey = "7b6082b8fe526faa7a3e5f9d6dae8769";
    let unit = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showWeather);
    console.log(url);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div className="weather">
        <div className="weather-app">
          <div>
            <FormattedDate date={weatherData.date} />{" "}
          </div>
          <form className="searchForm mb-4" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-9">
                <input
                  type="text"
                  className="form-control city-input"
                  placeholder="Type your city"
                  onChange={updateCity}
                />
              </div>
              <div className="col-3">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary w-100"
                />
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-md-4">
              <h1 className="currCity">{weatherData.city}</h1>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex mt-1">
                    <div>
                      <IconManager code={weatherData.icon} size={40} />
                    </div>

                    <div>
                      <TempConversion celsius={weatherData.temperature} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <ul>
                    <li>Humidity: {weatherData.humidity}%</li>
                    <li>Wind: {weatherData.wind} km/h</li>
                  </ul>
                  <p className="description">{weatherData.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={visibility}>
            <div className="weather-forecast">
              <div className="container">
                <div className="single-forecast">
                  <div className="forecast-date">Sun</div>
                  <img
                    src="http://openweathermap.org/img/wn/10d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">15°C</span>
                    <span className="forecast-temp-min">5°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Mon</div>
                  <img
                    src="http://openweathermap.org/img/wn/02d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">13°C</span>
                    <span className="forecast-temp-min">7°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Tue</div>
                  <img
                    src="http://openweathermap.org/img/wn/03d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">15°C</span>
                    <span className="forecast-temp-min">10°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Wed</div>
                  <img
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">13°C</span>
                    <span className="forecast-temp-min">7°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Thu</div>
                  <img
                    src="http://openweathermap.org/img/wn/09d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">11°C</span>
                    <span className="forecast-temp-min">4°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Fri</div>
                  <img
                    src="http://openweathermap.org/img/wn/11d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">7°C</span>
                    <span className="forecast-temp-min">0°C</span>
                  </div>
                </div>
                <div className="single-forecast">
                  <div className="forecast-date">Sat</div>
                  <img
                    src="http://openweathermap.org/img/wn/13d@2x.png"
                    alt="weather icon"
                    className="icon-small"
                  />
                  <div className="forecast-temp">
                    <span className="forecast-temp-max">3°C</span>
                    <span className="forecast-temp-min">-5°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a href="https://github.com/Alleviata/react-final">
            Open-source code
          </a>
          <span> by Yuliia</span>
        </footer>
      </div>
    );
  } else {
    search();
  }
}
