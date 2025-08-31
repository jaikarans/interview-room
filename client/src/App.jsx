import './App.css';

import LandingPage from './components/LandingPage';
import { Route, Routes } from 'react-router-dom';
import Lobby from './components/lobby/Lobby';
import Room from './components/room/Room';
import { Editor } from './components/room/monaco/Editor';
import RoomPage from './components/roomPage/RoomPage';
import { RoomProvider } from './RoomContext';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<Lobby />} /> */}
      <Route path="/:roomId" element={<RoomProvider><RoomPage /></RoomProvider>} />
      {/* <Route path="/" element={<Room />} /> */}
      {/* <Route path="/" element={<Room />} /> */}
    </Routes>
  );
}


export default App;
