import { createContext, useState, useContext, useRef, useLayoutEffect, useMemo } from 'react';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {

  // const api = process.env.API_URL;
  const apiUrl = process.env.REACT_APP_API_URL;

  const [roomId, setRoomId] = useState(null);
  console.log(window.location.pathname.substring(1));

  const wsRef = useRef(null);

  const localMediaRef = useRef(null);
  const peerMediaRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const ws = useMemo(() => {
    const socket = new WebSocket("wss://localhost:8443/ws");
    wsRef.current = socket;
    console.log('WebSocket created', wsRef);
    return socket;
  }, []);

  const [isSocketConneted, setIsSocketConneted] = useState(false);

  const [isJoined, setIsJoined] = useState(false);

  const value = {
    apiUrl,
    roomId, setRoomId,
    wsRef,
    isSocketConneted, setIsSocketConneted,
    isJoined, setIsJoined,
    localMediaRef, peerMediaRef,
    videoOn, setVideoOn,
    micOn, setMicOn,
    
  };

  useLayoutEffect(() => {
    console.log('Setting WebSocket handlers');

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      console.log("roomid", roomId);
      // Example: send an "enter" event
      ws.send(
        JSON.stringify({
          type: "enter",
          roomId: `${window.location.pathname.substring(1)}`,
          payload: {ll: "Hello server 👋"},
        })
      );
      setIsSocketConneted(true);
    };

    

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("🔌 WebSocket closed:", event);
      setIsSocketConneted(false);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

// custom hook for easy consumption for components
export const useRoomContext = () => {
  return useContext(RoomContext);
};