import React from 'react';
import clearSkyDIcon from '../assets/weather icon/clear sky day.svg';
import clearSkyNIcon from '../assets/weather icon/clear sky night.png';
import fewCloudsDIcon from '../assets/weather icon/few clouds day.png';
import fewCloudsNIcon from '../assets/weather icon/few clouds night.png';
import scatCloudsDIcon from '../assets/weather icon/scattered clouds day.png';
import scatCloudsNIcon from '../assets/weather icon/scattered clouds night.png';
import brokenCloudsDIcon from '../assets/weather icon/broken clouds day.png';
import brokenCloudsNIcon from '../assets/weather icon/broken clouds night.png';
import showerRainDIcon from '../assets/weather icon/shower rain day.png';
import showerRainNIcon from '../assets/weather icon/shower rain night.png';
import rainDIcon from '../assets/weather icon/rain day.png';
import rainNIcon from '../assets/weather icon/rain night.png';
import thunderDIcon from '../assets/weather icon/thunderstorm day.png';
import thunderNIcon from '../assets/weather icon/thunderstorm night.png';
import snowIcon from '../assets/weather icon/snow.png';
import mistIcon from '../assets/weather icon/mist.png';

const icons = {
  w01d: clearSkyDIcon,
  w01n: clearSkyNIcon,
  w02d: fewCloudsDIcon,
  w02n: fewCloudsNIcon,
  w03d: scatCloudsDIcon,
  w03n: scatCloudsNIcon,
  w04d: brokenCloudsDIcon,
  w04n: brokenCloudsNIcon,
  w09d: showerRainDIcon,
  w09n: showerRainNIcon,
  w10d: rainDIcon,
  w10n: rainNIcon,
  w11d: thunderDIcon,
  w11n: thunderNIcon,
  w13d: snowIcon,
  w13n: snowIcon,
  w50d: mistIcon,
  w50n: mistIcon
}

const WeatherIcons = (props) => {
  const { weatherType, className } = props;
  return (
    <img src={icons[weatherType]} alt={weatherType} className={className} />
  );
}

export default WeatherIcons;