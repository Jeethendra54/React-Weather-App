import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import humid from "./humid.svg"
import temp from "./temp.svg"
import wind_stream from "./wind_stream.svg"
import tempo from "./tempo.svg"
import '../src/style.css'

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        setLoading(true);
        const apiKey = "94769bac42f99a1dd90610f2611e3ae4";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        try {
          const response = await axios.get(apiUrl);
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    fetchWeatherData();
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const renderWeatherData = () => {
    if (loading) {
      return <p>Loading weather data...</p>;
    }

    if (!weatherData) {
      return null;
    }

    const weatherDescription = weatherData.weather[0].description;
    const temperature = Math.round(weatherData.main.temp);
    const feelsLikeTemperature = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    return (
      <div className="container">
        <h2 id="location">{location}</h2>
        <h4>Weather Info</h4>
        <div id="info-1">
            <img src= {temp} alt="" className="temp"/>
            <div className="logo-info">{temperature}°C,{weatherDescription} </div>
            <img src= {humid} alt="" id="humid"/>
            <div className="logo-info">Humidity: {humidity}%</div>
        </div>
        <div id="info-2">
            <img src={tempo} alt="" id="tempo"/>
            <div className="logo-info">Feels like: {feelsLikeTemperature}°C</div>
            <img src= {wind_stream} alt="" id="wind"/>
            <div className="logo-info">Wind Speed: {windSpeed} m/s</div>
        </div>
      </div>
    );
  };

  const renderLocationDropdown = () => {
    const dropdownstyle = {
      backgroundColor: '#fff',
      color: '#333',
      fontSize: '1rem',
      padding: '0.25rem',
      border: '1px solid #ccc',
      borderRadius: '0.25rem',
      marginLeft: '35%',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
    }
    
    return (
      <select value={location} onChange={handleLocationChange} style={dropdownstyle}>
        <option value="">Select a location...</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="Argentina">Argentina</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Belgium">Belgium</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Brazil">Brazil</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Canada">Canada</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Denmark">Denmark</option>
        <option value="Egypt">Egypt</option>
        <option value="Estonia">Estonia</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
        <option value="Greece">Greece</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran</option>
        <option value="Iraq">Iraq</option>
        <option value="Italy">Italy</option>
        <option value="North korea">North Korea</option>
      </select>
    );
  };

  const renderHeader = () => {
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    const modify = {
      fontSize : "17px",
      marginLeft : "3%"
    }
    return (
      <div>
        <h1>React Weather App</h1>
        <p style={modify}>{date}</p>
        <p style={modify}>Hello User. Find the relevant weather info of your location.</p>
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderLocationDropdown()}
      {renderWeatherData()}
    </div>
  );
};

export default WeatherApp;