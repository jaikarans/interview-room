import './App.css';

import LandingPage from './components/LandingPage';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './components/roomPage/RoomPage';
import { RoomProvider } from './RoomContext';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:roomId" element={<RoomProvider><RoomPage /></RoomProvider>} />
    </Routes>
  );
}


export default App;
