import React, { useState, useEffect } from "react";
import axios from "axios";

import "./DailyForecast.css";
import ForecastDay from "./ForecastDay";

export default function DailyForecast(props) {
  let [ready, setReady] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setReady(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="weather-forecast">
        <div className="row">
          {forecast.map(function (daily, index) {
            if (index < 7) {
              return (
                <div className="col" key={index}>
                  <ForecastDay day={daily} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    const apiKey = "7b6082b8fe526faa7a3e5f9d6dae8769";
    let lon = props.coordinates.lon;
    let lat = props.coordinates.lat;
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }
}
