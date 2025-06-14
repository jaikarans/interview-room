import { Button, Center, Spacer, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MediaPreview from "./MediaPreview";
import axios from "axios";

const WaitingRoom = () => {
  const [roomExist, setRoomExist] = useState(null);

  useEffect(() => {
    axios.get('/room-exist'+window.location.pathname)
      .then((res) => {
        setRoomExist(res.data);
      })
      .catch(err => console.log("WaitingRoom useEffect err: ", err));

  }, []);


  return (
    <Center width="100vw" height="100vh" bg="gray.100">
      <Stack 
        width="50vw" height="50vh"
        direction={['column', 'row']}
      >
        <Spacer />
        <MediaPreview roomExist={roomExist} />
        <Spacer />
        {!roomExist && 
          <VStack>
            <Text textStyle={"3xl"}>Getting ready...</Text>
            <Text textStyle={"md"}>You'll be able to join in just a moment</Text>
            <Spacer />
            <Spinner color="blue.500" borderWidth="4px" size={"xl"} animationDuration="1s"/>
          </VStack>
        }
        {roomExist && 
          <VStack>
            <Text textStyle={"3xl"}>Ready to join?</Text>
            <Text textStyle={"md"}>no one else here</Text>
            <Spacer />
            <Button>join now</Button>
          </VStack>
        }
        <Spacer />
      </Stack>

    </Center>
  );
}

export default WaitingRoom;