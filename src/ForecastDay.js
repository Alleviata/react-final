import React from "react";
import IconManager from "./IconManager";

export default function ForecastDay(props) {
  function day() {
    let date = new Date(props.day.dt * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];

    return day;
  }
  return (
    <div className="single-forecast">
      <div className="forecast-date">{day()}</div>
      <IconManager code={props.day.weather[0].icon} size={40} />
      <div className="forecast-temp">
        <span className="forecast-temp-max">
          {Math.round(props.day.temp.max)}°
        </span>
        <span> </span>
        <span className="forecast-temp-min">
          {Math.round(props.day.temp.min)}°
        </span>
      </div>
    </div>
  );
}
