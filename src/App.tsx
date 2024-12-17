import React from "react";
import Countdown from "./components/Countdown";
import Location from "./components/location";
import "./App.css";

function App() {
  return (
    <>
      <div className="top-time">
        <h1>Time Sunny's back in NZ!</h1>
        <Countdown />
      </div>
      <div className="locations">
        <Location countryName="Korea" cityName="Seoul" timeZone="Asia/Seoul" />
        <Location
          countryName="New Zealand"
          cityName="Dunedin"
          timeZone="Pacific/Auckland"
        />
      </div>
    </>
  );
}

export default App;
