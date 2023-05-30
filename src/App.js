import { Routes, Route} from 'react-router-dom';
import FrontPage from './routes/front-page/front-page';
import HomePage from './routes/home-page/home-page';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
