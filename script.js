const NZtime = document.querySelector(".NZ-time");
const Ktime = document.querySelector(".K-time");
const Kweather = document.querySelector(".K-weather");
const NZweather = document.querySelector(".NZ-weather");
const Ktemp = document.querySelector(".K-temp");
const NZtemp = document.querySelector(".NZ-temp");
const topTime = document.querySelector(".top-time-label");

var countDownDate = new Date("May 6, 2026 00:00:00").getTime();

function updateCountdown() {
  var now = new Date().getTime();
  var timeleft = countDownDate - now;
      
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  
  topTime.innerHTML = `<span>${days}d</span> <span>${hours}h</span> <span>${minutes}m</span> <span>${seconds}s</span>`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function setNZT() {
  const d = new Date();
  NZtime.innerHTML = d.toLocaleTimeString('en-US', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: true });
}

function setKT(){
  const d = new Date();
  Ktime.innerHTML = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: true });
}

function updateDynamicBackground() {
  const now = new Date();
  // Average the hours for a "middle ground" feel or just use local time for the viewer
  const hour = now.getHours();
  const body = document.body;
  
  // Remove existing bg classes
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

setKT();
setNZT();
updateDynamicBackground();
setInterval(setNZT, 1000);
setInterval(setKT, 1000);
setInterval(updateDynamicBackground, 60000); // Check every minute

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
      Kweather.innerHTML = `${getWeatherIcon(Kdata.weather[0].description)} ${Kdata.weather[0].description}`;
      Ktemp.innerHTML = Math.round(Kdata.main.temp - 273.15) + "°C";

      const NZresponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Dunedin,NZ&appid=c72c9fec85804dd470fe2798cbe68933");
      const NZdata = await NZresponse.json();
      NZweather.innerHTML = `${getWeatherIcon(NZdata.weather[0].description)} ${NZdata.weather[0].description}`;
      NZtemp.innerHTML = Math.round(NZdata.main.temp - 273.15) + "°C";
      
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

fetchData();
setInterval(fetchData, 600000); // Update weather every 10 mins
