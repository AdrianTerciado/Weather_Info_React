import React from "react";
import "./WeatherCard.css"

const WeatherCard = ({fecha, horario, temperatura, tiempo, icon}) => {

  return  <article className="card">
            <h5>{fecha}</h5>
            <p>Hora: {horario}</p>
            <p>Temperatura: {temperatura}</p>
            <p>Tiempo: {tiempo}</p>
           <img src={icon} alt="icono" />
          </article>;

};

export default WeatherCard;