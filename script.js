const NZtime = document.querySelector(".NZ-time");
const Ktime = document.querySelector(".K-time");
const Kweather = document.querySelector(".K-weather");
const NZweather = document.querySelector(".NZ-weather");
const Ktemp = document.querySelector(".K-temp");
const NZtemp = document.querySelector(".NZ-temp");
const topTime = document.querySelector(".top-time-label");

// Use ISO format for better compatibility with iPhone/Safari
var countDownDate = new Date("2026-05-06T00:00:00").getTime();

function updateCountdown() {
  var now = new Date().getTime();
  var timeleft = countDownDate - now;
  
  if (isNaN(timeleft) || timeleft < 0) {
    if (topTime) topTime.innerHTML = "The Wait is Over! ❤️";
    return;
  }
      
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  
  if (topTime) {
    topTime.innerHTML = `<span>${days}d</span> <span>${hours}h</span> <span>${minutes}m</span> <span>${seconds}s</span>`;
  }
}

function setNZT() {
  if (!NZtime) return;
  const d = new Date();
  NZtime.innerHTML = d.toLocaleTimeString('en-US', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: true });
}

function setKT(){
  if (!Ktime) return;
  const d = new Date();
  Ktime.innerHTML = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: true });
}

function updateDynamicBackground() {
  if (!document.body) return;
  const now = new Date();
  const hour = now.getHours();
  const body = document.body;
  
  body.classList.remove('bg-morning', 'bg-day', 'bg-evening', 'bg-night');
  
  if (hour >= 5 && hour < 10) {
    body.classList.add('bg-morning');
  } else if (hour >= 10 && hour < 17) {
    body.classList.add('bg-day');
  } else if (hour >= 17 && hour < 21) {
    body.classList.add('bg-evening');
  } else {
    body.classList.add('bg-night');
  }
}

function getWeatherIcon(desc) {
  desc = desc.toLowerCase();
  if (desc.includes('sun') || desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('storm')) return '⛈️';
  return '🌈';
}

async function fetchData() {
  try {
      const Kresponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=c72c9fec85804dd470fe2798cbe68933");
      const Kdata = await Kresponse.json();
      if (Kweather) Kweather.innerHTML = `${getWeatherIcon(Kdata.weather[0].description)} ${Kdata.weather[0].description}`;
      if (Ktemp) Ktemp.innerHTML = Math.round(Kdata.main.temp - 273.15) + "°C";

      const NZresponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Dunedin,NZ&appid=c72c9fec85804dd470fe2798cbe68933");
      const NZdata = await NZresponse.json();
      if (NZweather) NZweather.innerHTML = `${getWeatherIcon(NZdata.weather[0].description)} ${NZdata.weather[0].description}`;
      if (NZtemp) NZtemp.innerHTML = Math.round(NZdata.main.temp - 273.15) + "°C";
      
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

// Initialize everything once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setKT();
  setNZT();
  updateDynamicBackground();
  updateCountdown();
  fetchData();
  
  setInterval(setNZT, 1000);
  setInterval(setKT, 1000);
  setInterval(updateCountdown, 1000);
  setInterval(updateDynamicBackground, 60000);
  setInterval(fetchData, 600000);
});
