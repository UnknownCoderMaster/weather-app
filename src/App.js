import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.scss';

const App = () => {

  const [city, setCity] = useState('Tashkent');
  const [weather, setWeather] = useState({
    "coord": {
        "lon": 69.2163,
        "lat": 41.2646
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 273.12,
        "feels_like": 273.12,
        "temp_min": 273.12,
        "temp_max": 273.12,
        "pressure": 1034,
        "humidity": 64
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.03,
        "deg": 140
    },
    "clouds": {
        "all": 0
    },
    "dt": 1676128277,
    "sys": {
        "type": 1,
        "id": 9016,
        "country": "UZ",
        "sunrise": 1676082242,
        "sunset": 1676119851
    },
    "timezone": 18000,
    "id": 1512569,
    "name": "Tashkent",
    "cod": 200
});
  const ApiKey = '8e4253ca6d13a82826435e262a3d94f8';

  async function getInfo(e){
    if(e.key == 'Enter'){
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
      .then((response) => {
        setWeather(response);
        console.log(weather, response);
      });
    }
  }

  const GET_infor = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
    .then( (response) => {
      setWeather(response.data);
      console.log(weather);
    })
  }

  useEffect(
    GET_infor, []);

  return (
    <>
    <div className='container'>
      <div className='title'>
        <h1>Personal Weather app</h1>
      </div>
      <div className='sides'>
        <div className='left-side'>
          <div className='side-bar'>
            <div className='side-bar-title'>
              Weather App
            </div>
            <div className='side-bar-body'>
              <input className='search'
                type={'text'}
                placeholder='City name'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                // onKeyPress={getInfo}
              />
              <button className='btn'
                onClick={GET_infor}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className='right-side'>
          <div className='main-info'>
            <div className='main-card'>
              <div className='weather-pic'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              </div>
              <div className='weather-name'>
                {weather.weather[0].main}
              </div>
            </div>
            <div className='city-info'>
              <div className='temp'>
                {Math.round(weather.main.temp - 273.15)} C
              </div>
              <div className='location'>
                <h3 className='country'>{weather.sys.country ? weather.sys.country : 'none'}</h3>
                <h1 className='city'>{weather.name}</h1>
                <span className='loc-icon'>
                    <img src='icons/Glyphish-Glyphish-193-location-arrow.32.png' alt='location' />
                    <h6>Joylashuv: {`${weather.coord.lon}, ${weather.coord.lat}`}</h6>
                </span>
                
              </div>
            </div>
            <div className='information'>
            <div className='props'>
                <h3 className='key'>His qiladigan harorat</h3>
                <div className='action-img'>
                  <img src='icons/feel-temperature.png' alt={'feels_like'}/>
                </div>
                <p className='value'>{Math.round(weather.main.feels_like - 273.15)} C</p>
              </div>
              <div className='props'>
                <h3 className='key'>Shamol</h3>
                <div className='action-img'>
                  <img src='icons/icons8-wind-50.png' alt='wind'/>
                </div>
                <p className='value'>{weather.wind.speed} m/s</p>
              </div>
              <div className='props'>
                <h3 className='key'>Bosim</h3>
                <div className='action-img'>
                  <img src='icons/air-pressure.png' alt='pressure'/>
                </div>
                <p className='value'>{weather.main.pressure} mBar</p>
              </div>
              <div className='props'>
                <h3 className='key'>Maksimal harorat</h3>
                <div className='action-img'>
                  <img src='icons/temperature-high.png' alt='max_temp'/>
                </div>
                <p className='value'>{Math.round(weather.main.temp_max - 273.15)} C</p>
              </div>
              <div className='props'>
                <h3 className='key'>Minimal harorat</h3>
                <div className='action-img'>
                  <img src='icons/temperature.png' alt='min_temp'/>
                </div>
                <p className='value'>{Math.round(weather.main.temp_min - 273.15)} C</p>
              </div>
              <div className='props'>
                <h3 className='key'>Namlik</h3>
                <div className='action-img'>
                  <img src='icons/hygrometer.png' alt='humidity'/>
                </div>
                <p className='value'>{weather.main.humidity} %</p>
              </div>
              <div className='props'>
                <h3 className='key'>Bulutlilik darajasi</h3>
                <div className='action-img'>
                  <img src='icons/onedrive.png' alt='clouds'/>
                </div>
                <p className='value'>{weather.clouds.all} %</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;