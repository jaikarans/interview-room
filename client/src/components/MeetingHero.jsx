"use client"

import { Box, Button, Card, Input, Menu, Portal, Spacer } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { useRef, useState } from "react";
import MeetingLinkPopup from "./MeetingLinkPopup";
import api from "../api";


const MeetingHero = (props) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const inputRef = useRef();

  console.log('api.link', api.defaults.baseURL)

  const createMeeting = async () => {
    await api.post('/rooms')
      .then((res) => {
        setIsPopupOpen(true);
        const meetingPageLink = window.location.origin+ '/' + res.data.id;
        setMeetingLink(meetingPageLink);
      })
      .catch((err) => {
        toaster.error({
          title: err.code,
          description: err.message,
        });
      });
  }

  const createInstantMeeting = async () => {
    await api.post('/rooms')
      .then((res) => {
        window.location.href = window.location.origin + '/' + res.data.id;
      })
      .catch((err) => {
        // show a error toast
        toaster.error({
          title: err.code,
          description: err.message,
        });
      });
  }

  const handleJoin = () => {
    const inputStr = inputRef.current.value;
    if (inputStr === '') return;
    if (inputStr.includes('http')) {
      // full link like http://localhost:3000/abc-def-ijk
      window.location.href = inputStr;
    } else {
      // only id like abc-def-ijk
      window.location.href = window.location.origin + '/' + inputStr;
    }
  }

  return(
    <Box
    p='0'
    m='0'
    flex="1"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <MeetingLinkPopup isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      meetingLink={meetingLink}
      setMeetingLink={setMeetingLink}
    />
    <Toaster />
    <Card.Root
      p="0"
      bg="background"
      border="none"
      maxW="35rem"
    >
      <Card.Body userSelect="none" gap="2">
        <Card.Title
          as="h1"
          fontFamily='"Inter Tight", sans-serif'
          fontOpticalSizing="auto"
          fontStyle="normal"
          fontSize="2.8125rem"
          fontWeight="700"
          letterSpacing="0"
          lineHeight="3.25rem"
          pb="0.5rem"
          m={0}                

        >
          One Unified Space for Every Interview
        </Card.Title>
        <Card.Description
          fontFamily='"Inter", sans-serif'
          fontOpticalSizing="auto"
          fontStyle="normal"
          fontSize="1.375rem"
          fontWeight="400"
          letterSpacing="0"
          lineHeight="1.75rem"
          pb="2rem"                
          maxW="30rem"
        >  
          Discuss, demonstrate, and evaluate seamlessly without ever switching tools.
        </Card.Description> 
      </Card.Body>
      <Card.Footer
          pb="0"
          flex="1"
          display="flex"
          alignItems='flex-start'
          flexDirection={{base: "column", md: 'row'}}
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="filled" size="md"> New meeting </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content bg="secondary-container" color="on-secondary-container">
                <Menu.Item onClick={createMeeting} value="new-meeting"
                  _hover={{
                    bg: 'primary',
                    color: 'on-primary'
                  }}
                > Create a meeting for later </Menu.Item>
                <Menu.Item onClick={createInstantMeeting} value="instant-meeting"
                  _hover={{
                    bg: 'primary',
                    color: 'on-primary'
                  }}
                > Create an instant meeting </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        {/* <Spacer/> */}
        <Box
          // pl={{base: '1rem', md: '0px'}}
          w={{md: '100%'}}
          flex='1'
          display='flex'
          flexDirection='row'
          alignItems='center'
          gap={1}
        >
          <Input
            // flexGrow={1}
            ref={inputRef}
            border="1px solid"
            borderRadius="0.75rem"
            fontSize="1rem"
            fontWeight="medium"
            placeholder="Enter a code or link"
          />
          <Spacer />
          <Button variant="textButton" onClick={handleJoin}> Join </Button>
        </Box>
      </Card.Footer>
    </Card.Root>
  </Box>
  );
}

export default MeetingHero;