import Lobby from "../lobby/Lobby";
import Room from "../room/Room"
import { useRoomContext } from "../../RoomContext";
import { useEffect, useLayoutEffect } from "react";

const RoomPage = () => {
  const {isJoined, roomId, wsRef, setRoomId, setIsSocketConneted} = useRoomContext();


  useLayoutEffect(() => {

    // www.localhost:8443/abc-defg-hij -> room id => abc-defg-hij
    setRoomId(document.URL.substring(document.URL.lastIndexOf("/")+1));

  }, []);


  return (
    <>
      {isJoined ? (
        <>
          <Room />
        </>
      ) : (
        <>
          <Lobby />
        </>
      )}
    </>
  );
}

export default RoomPage;