import React, { useEffect, useState, useRef } from "react";
import WeatherCard from "./WeatherCard";
import "./WeatherList.css"

const WeatherList = () => {

  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    getLocation();
  }, []);


  useEffect(() => {
    const getWeatherByLocation = async () => {

      console.log(latitude);
      console.log(longitude);
      if (latitude && longitude) {
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
        );
        const data = await resp.json();
        console.log(data.name);

        setCity(data.name);
      }
    };
    getWeatherByLocation();
  }, [latitude, longitude]);


  useEffect(() => {
    const getWeatherbyCity = async () => {
      if (city) {
        const resp = await fetch(`http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${import.meta.env.VITE_API_KEY}`);

        const data = await resp.json();
        setWeather(data.list);
      }
    }
    getWeatherbyCity();
  }, [city]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target.newCity.value);
  };

  const paintItems = () =>
    weather.map((item, index) => (
      <WeatherCard
        key={index}
        fecha={item.dt_txt.split(" ")[0]}
        horario={item.dt_txt.split(" ")[1]}
        temperatura={item.main.temp}
        tiempo={item.weather[0].main}
        icon={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
    ));

  return <section>
    <h1>Este es el WeatherList</h1>

    <form onSubmit={handleSubmit}>
      <input type="text" name="newCity" />
      <input type="submit" value="Buscar" ></input>
    </form>

    <h2>{city}</h2>

    <div className="cards-container">
      {paintItems()}
    </div>

  </section>;
};

export default WeatherList;