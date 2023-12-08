const NZtime = document.querySelector(".NZ-time");
const Ktime = document.querySelector(".K-time");
const Kweather = document.querySelector(".K-weather");
const NZweather = document.querySelector(".NZ-weather");
const Ktemp = document.querySelector(".K-temp");
const NZtemp = document.querySelector(".NZ-temp");




setNZT();
function setNZT() {
  const d = new Date();
  NZtime.innerHTML = d.toLocaleTimeString('en-US', { timeZone: 'Pacific/Auckland', hour12: true });
}



function setKT(){
  const d = new Date;
  Ktime.innerHTML = d.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour12: true });
}

setKT();
setNZT();
setInterval(setNZT, 1000);
setInterval(setKT, 1000);
async function fetchData() {
  try {
      const Kresponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=c72c9fec85804dd470fe2798cbe68933");
      const Kdata = await Kresponse.json();

      Kweather.innerHTML =Kdata.weather[0].description
      Ktemp.innerHTML =(Kdata.main.temp-273.15).toFixed(2)+" degrees";


      const NZresponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Waikanae,NZ&appid=c72c9fec85804dd470fe2798cbe68933");
      const NZdata = await NZresponse.json();

      NZweather.innerHTML =NZdata.weather[0].description;
      NZtemp.innerHTML =(NZdata.main.temp-273.15).toFixed(2)+" degrees";
      
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

fetchData();


