import React from 'react';
import './front-page.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search_icon.gif';
import sun from '../../assets/sun_icon.svg';
import moon from '../../assets/moon_icon.png';
import videoBg from '../../assets/videoBg.webm';

let inputData;
const FrontPage = () => {
    const navigate = useNavigate();
    const now = new Date();

    const handleEnterPress = (e) => {
        if(e.key === 'Enter') {
            inputData = e.target.value;
            navigate('/home');
        }
    }
    return (
        <>
            <main className="front-page-main">
                <section className="front-page-left">
                    <h1 className='front-logo'>Weather {now.getHours() < 18 ? <img className='sun-icon' src={sun} alt="sun-icon" /> : <img className='moon-icon' src={moon} alt="sun-icon" />}</h1>
                    <h3 className='desc'>find out the city's weather</h3>
                </section>
                <section className="front-page-right">
                    <div className="search-container">
                        <input className='search-input' type='text' placeholder="Search city" onKeyDown={handleEnterPress} />
                        <img className='search-icon' src={searchIcon} alt='search-icon' />
                    </div>
                </section>
            </main>
            <div className="transparent-bg"></div>
            <div className='video-container'>
                <video className='video-bg' src={videoBg} autoPlay muted loop />
            </div>
        </>
    );
}

export const inputFromUser = () => {
    const userInput = inputData;
    return userInput;
};

export default FrontPage;