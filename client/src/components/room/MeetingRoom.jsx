import { useEffect, useState } from "react";
import axios from "axios";
import WaitingRoom from "./WaitingRoom";
import InvalidRoom from "./InvalidRoom";

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



  if (roomExist === false) {
    return <InvalidRoom />;
  }

  return (
    <> 
      <WaitingRoom roomExist={roomExist} />
    </>
  );
};

export default MeetingRoom;
