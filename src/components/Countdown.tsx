import React, { useEffect, useState } from "react";

const date = new Date("2025-02-01");

function getTimeLeft() {
  const now = new Date();
  const difference = date.getTime() - now.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    });
  });
  return (
    <h2>{`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}</h2>
  );
}

export default Countdown;
