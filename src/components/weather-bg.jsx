import React from 'react';
import clearSkyDBg from '../assets/weather bg/clear_sky_day.jpg';
import clearSkyNBg from '../assets/weather bg/clear_sky_night.jpg';
import fewCloudsDBg from '../assets/weather bg/few_cloud_day.jpg';
import fewCloudsNBg from '../assets/weather bg/few_cloud_night.jpg';
import scatCloudsDBg from '../assets/weather bg/scattered_cloud_day.jpg';
import scatCloudsNBg from '../assets/weather bg/scattered_cloud_night.jpg';
import brokenCloudsDBg from '../assets/weather bg/broken_cloud_day.jpg';
import brokenCloudsNBg from '../assets/weather bg/broken_cloud_night.jpg';
import showerRainDBg from '../assets/weather bg/light_rain_day.jpg';
import showerRainNBg from '../assets/weather bg/light_rain_night.jpg';
import rainDBg from '../assets/weather bg/heavy_rain_day.jpg';
import rainNBg from '../assets/weather bg/heavy_rain_night.jpg';
import thunderDBg from '../assets/weather bg/thunderstorm_day.jpg';
import thunderNBg from '../assets/weather bg/thunderstorm_night.jpg';
import snowDBg from '../assets/weather bg/snow_day.jpg';
import snowNBg from '../assets/weather bg/snow_night.jpg';
import mistDBg from '../assets/weather bg/mist_day2.jpg';
import mistNBg from '../assets/weather bg/mist_night.jpg';

const bg = {
  w01d: clearSkyDBg,
  w01n: clearSkyNBg,
  w02d: fewCloudsDBg,
  w02n: fewCloudsNBg,
  w03d: scatCloudsDBg,
  w03n: scatCloudsNBg,
  w04d: brokenCloudsDBg,
  w04n: brokenCloudsNBg,
  w09d: showerRainDBg,
  w09n: showerRainNBg,
  w10d: rainDBg,
  w10n: rainNBg,
  w11d: thunderDBg,
  w11n: thunderNBg,
  w13d: snowDBg,
  w13n: snowNBg,
  w50d: mistDBg,
  w50n: mistNBg
}

const WeatherBg = (props) => {
  const { weatherType, className } = props;
  return (
    <img src={bg[weatherType]} alt={weatherType} className={className} />
  );
}

export default WeatherBg;