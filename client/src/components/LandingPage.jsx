import { Box, Button, Menu, Portal } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import axios from "axios";
import { useEffect, useState } from "react";
import MeetingLinkPopup from "./MeetingLinkPopup";

const LandingPage = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    console.log("isPopupOpen changed:", isPopupOpen);
  }, [isPopupOpen]);
  
  const createMeeting = async () => {
    await axios.post('/rooms')
      .then((res) => {
        const link = 'http://localhost:8080/' + res.data.id;
        setIsPopupOpen(true);
        setMeetingLink(link);
        console.log(isPopupOpen,link);
      })
      .catch((err) => {
        console.log('Error creating room:', err);
      });   
  
  }

  return (
    <Box>
      <ColorModeButton />
      <MeetingLinkPopup isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        meetingLink={meetingLink}
        setMeetingLink={setMeetingLink}
      />
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm">
            New meeting
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item onClick={createMeeting} value="new-meeting">Create a meeting for later</Menu.Item>
              <Menu.Item value="instant-meeting">Create an instant meeting</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  )
}

export default LandingPage;