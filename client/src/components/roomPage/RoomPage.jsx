import Lobby from "../lobby/Lobby";
import Room from "../room/Room"
import { useRoomContext } from "../../RoomContext";
import { useLayoutEffect } from "react";

const RoomPage = () => {
  const { isJoined, setRoomId } = useRoomContext();


  useLayoutEffect(() => {

    // www.localhost:8443/abc-defg-hij -> room id => abc-defg-hij
    setRoomId(document.URL.substring(document.URL.lastIndexOf("/")+1));

  // eslint-disable-next-line react-hooks/exhaustive-deps
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