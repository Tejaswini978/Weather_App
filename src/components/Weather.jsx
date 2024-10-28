import React, { useEffect,useRef , useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
// import cloudyy_icon from '../assets/cloudyy.png'
// import dizzle_icon from '../assets/dizzle.png'
import humidity_icon from '../assets/humidity.png'
// import rain_icon from '../assets/rain.png'
// import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const [WeatherData, SetWeatherData] = useState(false);

     const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": dizzle,
        "04n": dizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow
     }
    const search = async (city)=>{
        if(city ===""){
            alert("Enter city Name");
            return;
        }
        try{
            const apiKey = import.meta.env.VITE_API_KEY ;
            console.log(apiKey);
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon ;
            SetWeatherData({
                humidity:data.main.humidity,
                Windspeed:data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        } catch(error){ 
            SetWeatherData(false);
            console.log("Error in fetching data");
         }
    }

    useEffect(()=>{
        search("Hyderabad");
    },[])
  return (
    <div className='Weather'>
        <div className="search-bar">
            <input  ref={inputRef} type="text" placeholder='search'/>

            <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)}/> 
        </div>
        {WeatherData?<>
      <img src={WeatherData.icon} alt="" className='weather_icon' />
      <p className='temperature'>{WeatherData.temperature}</p>
      <p className='location'>{WeatherData.location}</p>
      <div className="weather-date">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{WeatherData.humidity}</p>
                <span> Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{WeatherData.Windspeed}</p>
                <span> Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather

