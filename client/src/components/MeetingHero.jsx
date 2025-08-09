"use client"

import { Box, Button, Card, Input, Menu, Portal, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { Toaster, toaster } from "./ui/toaster";


const MeetingHero = (props) => {

  const createMeeting = async () => {
    await axios.post('/rooms')
      .then((res) => {
        // setIsPopupOpen(true);
        const meetingPageLink = window.location.origin+ '/' + res.data.id;
        // setMeetingLink(meetingPageLink);
        // console.log(isPopupOpen,meetingPageLink);
      })
      .catch((err) => {
        // show a error toast to user
        toaster.error({
          title: err.code,
          description: err.message,
        });
      });
  }

  const createInstantMeeting = async () => {
    await axios.post('/rooms')
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

  return(
    <Box
    flex="1"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Toaster />
    <Card.Root
      p="5"
      bg="background"
      border="none"
      maxW="35rem"
    >
      <Card.Body userSelect="none" gap="2">
        <Card.Title
          as="h1"
          fontFamily='"Google Sans", Roboto, Arial, sans-serif'
          fontSize="2.8125rem"
          fontWeight="400"
          letterSpacing="0"
          lineHeight="3.25rem"
          pb="0.5rem"
          m={0}                

        >
          One Unified Space for Every Interview
        </Card.Title>
        <Card.Description
          fontFamily='"Google Sans", Roboto, Arial, sans-serif'
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
          display="flex"
          flex-direction="column"
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="filled" size="md"> New meeting </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content bg="secondaryContainer" color="onSecondaryContainer">
                <Menu.Item onClick={createMeeting} value="new-meeting"
                  _hover={{
                    bg: 'primary',
                    color: 'onPrimary'
                  }}
                > Create a meeting for later </Menu.Item>
                <Menu.Item onClick={createInstantMeeting} value="instant-meeting"
                  _hover={{
                    bg: 'primary',
                    color: 'onPrimary'
                  }}
                > Create an instant meeting </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <Spacer/>
        <Input
          border="1px solid"
          borderRadius="0.75rem"
          h="2.7rem"
          fontSize="1rem"
          fontWeight="medium"
          pl="1rem"
          pr="1rem"  
          placeholder="Enter a code or link"
        />
        <Button variant="textButton"> Join </Button>
      </Card.Footer>
    </Card.Root>
  </Box>
  );
}

export default MeetingHero;