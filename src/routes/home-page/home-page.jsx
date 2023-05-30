import React, { useEffect, useState } from "react";
import './home-page.css';
import sun from '../../assets/sun_icon.svg';
import moon from '../../assets/moon_icon.png';
import searchIcon from '../../assets/search_icon.gif';
import { inputFromUser } from "../front-page/front-page";
import feelsIcon from '../../assets/icon tambahan weather/feels_like_icon.png';
import airPressIcon from '../../assets/icon tambahan weather/air_pressure_icon.png';
import humidityIcon from '../../assets/icon tambahan weather/humidity_icon.png';
import sunriseIcon from '../../assets/icon tambahan weather/sunrise_icon.png';
import sunsetIcon from '../../assets/icon tambahan weather/sunset_icon.png';
import visiIcon from '../../assets/icon tambahan weather/visibility_icon.png';
import windsIcon from '../../assets/icon tambahan weather/winds_icon.png';
import WeatherIcons from "../../components/weather-icons";
import WeatherBg from "../../components/weather-bg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = () => {
    const [shortData, setShortData] = useState(null);
    const [longData, setLongData] = useState(null);
    const [localTime, setLocalTime] = useState(null);
    const [color, setColor] = useState(false);
    let timeZone = [];
    let cityName = inputFromUser();
    const now = new Date();
    const options = { weekday: 'short' };
    let lat, lon, time = null;
    const notify = () => {
        toast.error('There was a mistake!', {
            position: "top-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    
    const getWeather = () => {
        console.log('kota: ', cityName);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=03fb093a209eb4e2bf0e38bc670a5ecb`)
        .then(response => response.json())
        .then(response => {
            if(response.cod == "200") {
                setShortData(response);
            } else {
                notify();
            }
        })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=03fb093a209eb4e2bf0e38bc670a5ecb`)
        .then(response => response.json())
        .then(response => {
            if(response.cod == "200") {
                setLongData(response);
            }
        })
    }

    const getTimeZone = async () => {
        const timeIndex = [shortData.dt, longData.list[0].dt, shortData.sys.sunrise, shortData.sys.sunset];
        lat = longData.city.coord.lat;
        lon = longData.city.coord.lon;
        try {
            time = timeIndex[0];
            const response1 = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=SVNGZIIGU6IT&format=json&by=position&lat=${lat}&lng=${lon}&time=${time}`);
            const data1 = await response1.json();
            timeZone.push(data1.formatted);

            // Percobaan kode 
            const waktu1 = new Date(timeIndex[0] * 1000);
            const time1 = new Date(timeIndex[1] * 1000);
            const perbedaan1 = Math.abs(time1 - waktu1);
            const perbedaanJam1 = Math.floor(perbedaan1 / (1000 * 60 * 60));
            const perbedaanMenit1 = Math.floor((perbedaan1 % (1000 * 60 * 60)) / (1000 * 60));

            let hasilJam = new Date(timeZone[0]).getHours() + perbedaanJam1;
            let hasilMenit = new Date(timeZone[0]).getMinutes() + perbedaanMenit1;
            if(hasilMenit > 60) {
                hasilJam = hasilJam + 1;
                hasilMenit = hasilMenit % 60;
            }
            hasilMenit++;
            if(hasilMenit == 60) {
                hasilJam = hasilJam + 1;
                hasilMenit = '00';
            }
            for(let j = 1; j <= 4; j++) {
                if(hasilJam > 24) {
                    hasilJam = hasilJam % 24;
                } 
                timeZone.push(`${hasilJam == 24 ? 0 : hasilJam}.${hasilMenit}`);
                hasilJam += 3;
            }

            const waktu2 = new Date(timeZone[0]);
            const perbedaan = Math.abs(waktu1 - waktu2);
            const perbedaanJam = Math.floor(perbedaan / (1000 * 60 * 60)); 
            const perbedaanMenit = Math.floor((perbedaan % (1000 * 60 * 60)) / (1000 * 60)); 

            let sunriseHours, sunriseMinutes, sunsetHours, sunsetMinutes;
            if(new Date(timeIndex[0] * 1000) > new Date(timeZone[0])) {
                sunriseHours = new Date(timeIndex[2] * 1000).getHours() - perbedaanJam;
                sunriseMinutes = new Date(timeIndex[2] * 1000).getMinutes() - perbedaanMenit;
                sunsetHours = new Date(timeIndex[3] * 1000).getHours() - perbedaanJam;
                sunsetMinutes = new Date(timeIndex[3] * 1000).getMinutes() - perbedaanMenit;
                if(sunriseMinutes < 0) {
                    sunriseMinutes = 60 + sunriseMinutes;
                    sunriseHours = sunriseHours - 1;
                } else if (sunsetMinutes < 0) {
                    sunsetMinutes = 60 + sunsetMinutes;
                    sunsetHours = sunsetHours - 1;
                } else if(sunriseHours < 0) {
                    sunriseHours = 24 + sunriseHours;
                } else if(sunsetHours < 0) {
                    sunsetHours = 24 + sunsetHours;
                }
            } else if(new Date(timeIndex[0] * 1000) < new Date(timeZone[0])) {
                sunriseHours = new Date(timeIndex[2] * 1000).getHours() + perbedaanJam;
                sunriseMinutes = new Date(timeIndex[2] * 1000).getMinutes() + perbedaanMenit;
                sunsetHours = new Date(timeIndex[3] * 1000).getHours() + perbedaanJam;
                sunsetMinutes = new Date(timeIndex[3] * 1000).getMinutes() + perbedaanMenit;
                if(sunriseMinutes > 60) {
                    sunriseMinutes = sunriseMinutes % 60;
                    sunriseHours = sunriseHours + 1;
                } else if (sunsetMinutes > 60) {
                    sunsetMinutes = sunsetMinutes % 60;
                    sunsetHours = sunsetHours + 1;
                } else if(sunriseHours > 24) {
                    sunriseHours = sunriseHours % 24;
                } else if(sunsetHours > 24) {
                    sunsetHours = sunsetHours % 24;
                }
            } else {
                sunriseHours = new Date(timeIndex[2] * 1000).getHours();
                sunriseMinutes = new Date(timeIndex[2] * 1000).getMinutes();
                sunsetHours = new Date(timeIndex[3] * 1000).getHours();
                sunsetMinutes = new Date(timeIndex[3] * 1000).getMinutes();
            }
            

            timeZone.push(`${sunriseHours}.${sunriseMinutes}`);
            timeZone.push(`${sunsetHours}.${sunsetMinutes}`);
            setLocalTime(timeZone);
        } catch (error) {
            console.error(error);
        }
        
    }
    
    
    if(shortData === null && longData === null) {
        getWeather();
    }
    console.log('shortData ', shortData);
    
    const handleEnterPress = (e) => {
        if(e.key === 'Enter') {
            cityName = e.target.value;
            getWeather();
        }
    }

    const changeColor = () => {
        if(window.scrollY >= 43) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    window.addEventListener('scroll', changeColor);

    useEffect(() => {
        if(shortData !== null && longData !== null) {
            getTimeZone();
        }
    }, [shortData, longData]);
    return (
        <div className="home-div-page">
            <header className={color ? "app-header div-bg-color" : "app-header"}>
                <h1 className='home-logo'>Weather {now.getHours() < 18 ? <img className='home-sun-icon' src={sun} alt="sun-icon" /> : <img className='home-moon-icon' src={moon} alt="sun-icon" />}</h1>
                <div className="home-search-container">
                    <input className='home-search-input' type='text' placeholder="Search city" onKeyDown={handleEnterPress} />
                    <img className='home-search-icon' src={searchIcon} alt='search-icon' />
                </div>
            </header>
            <main className="home-main">
                <section className="first-section">
                    <section className="left-first-section">
                        <h3 className="city-name">{shortData ? shortData.name + ` (${shortData.sys.country})` : "Unknown City"}</h3>
                        <div className="weather-container">
                            <div className="sub-weather-container1">
                                {shortData && shortData.weather && <WeatherIcons weatherType={`w${shortData.weather[0].icon}`} className='weather-icon' />}
                                {/* {shortData && (stringLength > 10) ? <marquee className='weather-desc' direction='left' scrollamount="3">{shortData ? shortData.weather[0].description[0].toUpperCase() + shortData.weather[0].description.slice(1, 45) : "not known"}</marquee> : <p className="weather-desc">{shortData.weather[0].description[0].toUpperCase() + shortData.weather[0].description.slice(1, 45)}</p>} */}
                                <marquee className='weather-desc' direction='left' scrollamount="3">{shortData ? shortData.weather[0].description[0].toUpperCase() + shortData.weather[0].description.slice(1, 45) : "not known"}</marquee>
                            </div>
                            <div className="sub-weather-container2">
                                <h3 className="weather-info1">{shortData ? (shortData.main.temp - 273.15).toFixed(0) + ' \u00B0C' : "0"}</h3>
                                <h3 className="weather-info2">{localTime ? new Date(localTime[0]).toLocaleDateString('en-US', options) + " " + (shortData.main.temp_max - 273.15).toFixed(0) + "\u00B0 / " + (shortData.main.temp_min - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                        </div>
                    </section>
                    <section className="right-first-section">
                        <div className="long-info-container">
                            <div className="sub-long-info-container">
                                <h3>Now</h3>
                                {shortData && shortData.weather && <WeatherIcons weatherType={`w${shortData.weather[0].icon}`} className='weather-long-info-icon' />}
                                <h3 className="weather-long-info">{shortData ? (shortData.main.temp - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-long-info-container1">
                                <h3>{localTime ? localTime[1] : '0'}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[0].weather[0].icon}`} className='weather-long-info-icon' />}
                                <h3 className="weather-long-info">{longData && longData.list ? (longData.list[0].main.temp - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-long-info-container1">
                                <h3>{localTime ? localTime[2] : '0'}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[1].weather[0].icon}`} className='weather-long-info-icon' />}
                                <h3 className="weather-long-info">{longData && longData.list ? (longData.list[1].main.temp - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-long-info-container1">
                                <h3>{localTime ? localTime[3] : '0'}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[2].weather[0].icon}`} className='weather-long-info-icon' />}
                                <h3 className="weather-long-info">{longData && longData.list ? (longData.list[2].main.temp - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-long-info-container1">
                                <h3>{localTime ? localTime[4] : '0'}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[3].weather[0].icon}`} className='weather-long-info-icon' />}
                                <h3 className="weather-long-info">{longData && longData.list ? (longData.list[3].main.temp - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="second-section">
                    <section className="left-second-section">
                        <div className="sub-left-second-section">
                            <div className="adv-weather-container">
                                <img className="adv-weather-icon" src={feelsIcon} alt="feels-like-icon" />
                                <h3 className="adv-weather-info">Feels like</h3>
                                <h3 className="adv-weather-info1">{shortData ? (shortData.main.feels_like - 273.15).toFixed(0) + ' \u00B0C' : "0"}</h3>
                            </div>
                            <div className="adv-weather-container1">
                                <img className="adv-weather-icon" src={windsIcon} alt="winds-icon" />
                                <h3 className="adv-weather-info">Winds</h3>
                                <h3 className="adv-weather-info1">{shortData ? (shortData.wind.speed * 3.6).toFixed(0) + " km/h" : "0"}</h3>
                            </div>
                            <div className="adv-weather-container1">
                                <img className="adv-weather-icon" src={humidityIcon} alt="humidity-icon" />
                                <h3 className="adv-weather-info">Humidity</h3>
                                <h3 className="adv-weather-info1">{shortData ? shortData.main.humidity + '%' : "0"}</h3>
                            </div>
                        </div>
                        <div className="sub-left-second-section sub-bottom">
                            <div className="adv-weather-container">
                                <img className="adv-weather-icon" src={visiIcon} alt="visibility-icon" />
                                <h3 className="adv-weather-info">Visibility</h3>
                                <h3 className="adv-weather-info1">{shortData ? (shortData.visibility / 1000).toFixed(0) + ' km' : "0"}</h3>
                            </div>
                            <div className="adv-weather-container1">
                                <img className="adv-weather-icon" src={airPressIcon} alt="air-pressure-icon" />
                                <h3 className="adv-weather-info">Air Pressure</h3>
                                <h3 className="adv-weather-info1">{shortData ? shortData.main.pressure + " hPa" : "0"}</h3>
                            </div>
                            <div className="adv-weather-container2">
                                <div className="first-sub-adv-weather-container2">
                                    <img className="adv-weather-icon" src={sunriseIcon} alt="sunrise-icon" />
                                    <h3 className="adv-weather-info sun-info">Sunrise</h3>
                                    <h3 className="adv-weather-info1 sun-info1">{localTime ? localTime[5] : "0"}</h3>
                                </div>
                                <div className="second-sub-adv-weather-container2">
                                    <img className="adv-weather-icon" src={sunsetIcon} alt="sunset-icon" />
                                    <h3 className="adv-weather-info sun-info">Sunset</h3>
                                    <h3 className="adv-weather-info1 sun-info1">{localTime ? localTime[6] : "0"}</h3>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="right-second-section">
                        <div>
                            <h3 className="days-forecast-title">4-days forecast at {localTime ? localTime[1] : '0'}</h3>
                        </div>
                        <div className="sub-right-second-section">
                            <div className="sub-sub-right-second-section">
                                <h3 className="second-section-weather-day">Tomorrow</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[8].weather[0].icon}`} className='second-section-weather-icon' />}
                                <marquee className='second-section-weather-info' direction='left' scrollamount="3">{longData ? longData.list[8].weather[0].description[0].toUpperCase() + longData.list[8].weather[0].description.slice(1, 35) : "not known"}</marquee>
                                <h3 className="right-second-section-weather-info">{longData ? (longData.list[8].main.temp_max - 273.15).toFixed(0) + "\u00B0 / " + (longData.list[8].main.temp_min - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-sub-right-second-section1">
                                <h3 className="second-section-weather-day">{longData ? new Date(longData.list[16].dt_txt).toLocaleDateString("en-US", { weekday: "short" }) : "not known"}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[16].weather[0].icon}`} className='second-section-weather-icon' />}
                                <marquee className='second-section-weather-info' direction='left' scrollamount="3">{longData ? longData.list[16].weather[0].description[0].toUpperCase() + longData.list[16].weather[0].description.slice(1, 35) : "not known"}</marquee>
                                <h3 className="right-second-section-weather-info">{longData ? (longData.list[16].main.temp_max - 273.15).toFixed(0) + "\u00B0 / " + (longData.list[16].main.temp_min - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-sub-right-second-section2">
                                <h3 className="second-section-weather-day">{longData ? new Date(longData.list[24].dt_txt).toLocaleDateString("en-US", { weekday: "short" }) : "not known"}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[24].weather[0].icon}`} className='second-section-weather-icon' />}
                                <marquee className='second-section-weather-info' direction='left' scrollamount="3">{longData ? longData.list[24].weather[0].description[0].toUpperCase() + longData.list[24].weather[0].description.slice(1, 35) : "not known"}</marquee>
                                <h3 className="right-second-section-weather-info">{longData ? (longData.list[24].main.temp_max - 273.15).toFixed(0) + "\u00B0 / " + (longData.list[24].main.temp_min - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                            <div className="sub-sub-right-second-section3">
                                <h3 className="second-section-weather-day">{longData ? new Date(longData.list[32].dt_txt).toLocaleDateString("en-US", { weekday: "short" }) : "not known"}</h3>
                                {longData && longData.list && <WeatherIcons weatherType={`w${longData.list[32].weather[0].icon}`} className='second-section-weather-icon' />}
                                <marquee className='second-section-weather-info' direction='left' scrollamount="3">{longData ? longData.list[32].weather[0].description[0].toUpperCase() + longData.list[32].weather[0].description.slice(1, 35) : "not known"}</marquee>
                                <h3 className="right-second-section-weather-info">{longData ? (longData.list[32].main.temp_max - 273.15).toFixed(0) + "\u00B0 / " + (longData.list[32].main.temp_min - 273.15).toFixed(0) + '\u00B0' : "0"}</h3>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
            {shortData && shortData.weather && <WeatherBg weatherType={`w${shortData.weather[0].icon}`} className='weather-bg' />}
            <div className="gradient"></div>
            <div className={color ? 'div-bg div-bg-color' : 'div-bg'}></div>
            <ToastContainer />
        </div>
    );
}

export default HomePage;