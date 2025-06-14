import './App.css';

import LandingPage from './components/LandingPage';
import { Route, Routes } from 'react-router-dom';
import MeetingRoom from './components/room/MeetingRoom';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:roomId" element={<MeetingRoom />} />
    </Routes>
  );
}


export default App;
