import { useEffect, useState } from "react";
import axios from "axios";
import WaitingRoom from "./WaitingRoom";
import InvalidRoom from "./InvalidRoom";
import { ColorModeButton } from "../ui/color-mode";

const MeetingRoom = () => {
  const [roomExist, SetRoomExist] = useState(null);
  
  useEffect(() => {
    axios.get('/room-exist'+window.location.pathname)
      .then((res) => {
        console.log("/room-exist/{id} response:",res);
        if (res.data) {
          SetRoomExist(true);
  
        }
      })
      .catch(err => {
        console.log('roomExist', err);
        SetRoomExist(false);
      });
      
  }, []);

  useEffect(() => {
    if (roomExist) {
      const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
      const wsUrl = `${wsProtocol}://localhost:8080/ws${window.location.pathname}`;
      
    }
  }, [roomExist])



  if (roomExist === false) {
    return <InvalidRoom />;
  }

  return (
    <>
      <ColorModeButton />
      <WaitingRoom roomExist={roomExist} />
    </>
  );
};

export default MeetingRoom;
