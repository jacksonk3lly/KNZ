import { useEffect, useState } from "react";

function getTimeString(timeZone: string) {
  const d = new Date();
  return d.toLocaleTimeString("en-US", {
    timeZone: timeZone,
    hour12: true,
  });
}

async function fetchWeather(cityName: string) {
  try {
    let weatherDescription;
    let tempString;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c72c9fec85804dd470fe2798cbe68933`
    );
    const data = await response.json();
    weatherDescription = data.weather[0].description;
    tempString = (data.main.temp - 273.15).toFixed(2) + " degrees";
    return { weatherDescription, tempString };
  } catch (err) {
    console.error(err);
    return;
  }
}

interface LocationProps {
  countryName: string;
  cityName: string;
  timeZone: string;
}

function Location({ countryName, cityName, timeZone }: LocationProps) {
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempString, setTempString] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchWeather(cityName).then((data) => {
      if (data) {
        setWeatherDescription(data.weatherDescription);
        setTempString(data.tempString);
        console.log("api call");
      }
    });
  }, [cityName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeString(timeZone));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <div className="split">
      <div className="centered">
        <h1>{countryName}</h1>
        <h2>{cityName}</h2>
        <h2 className="time">{time}</h2>
        <h2 className="NZ-weather">{weatherDescription}</h2>
        <h2 className="NZ-temp">{tempString}</h2>
      </div>
    </div>
  );
}

export default Location;
