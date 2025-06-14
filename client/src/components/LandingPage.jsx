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
        setIsPopupOpen(true);
        const meetingPageLink = window.location.origin+ '/' + res.data.id;
        setMeetingLink(meetingPageLink);
        console.log(isPopupOpen,meetingPageLink);
      })
      .catch((err) => {
        console.log('Error creating room:', err);
      });   
  
  }

  const createInstantMeeting = async () => {
    await axios.post('/rooms')
      .then((res) => {
        window.location.href = window.location.origin + '/' + res.data.id;
      })
      .catch((err) => {
        console.log('Error creating romm:', err);
      })
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
              <Menu.Item onClick={createInstantMeeting} value="instant-meeting">Create an instant meeting</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  )
}

export default LandingPage;