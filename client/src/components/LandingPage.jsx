import { Box, Button, Card, HStack, Image, Input, Menu, Portal, Spacer, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import axios from "axios";
import { useEffect, useState } from "react";
import MeetingLinkPopup from "./MeetingLinkPopup";
import { system } from "./ui/theme";
import { Toaster, toaster } from "./ui/toaster";
import MeetingHero from "./MeetingHero";


const LandingPage = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    console.log("isPopupOpen changed:", isPopupOpen);
  }, [isPopupOpen]);
  

  return (
    <Box
      fontFamily='"Google Sans", Roboto, Arial, sans-serif'
      bg="surfaceDim"
      color="onSurfaceVariant"
      w="100vw" h="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Navigation Bar */}
      <Box
        bg="surfaceContainer"
        p="1" 
        borderBottomWidth="1px"
        borderColor={useColorModeValue("border.light", "border.dark")}
      >
        <HStack color="primary" px="12px">
          <Text
            as="h1"
            fontFamily='"Google Sans", Roboto, Arial, sans-serif'
            fontSize="1.4rem"
            fontWeight="200"
            letterSpacing="0"
            lineHeight="1.25rem"
          >
            Interview Room
          </Text>
          <Spacer />
          <ColorModeButton />
        </HStack>

      </Box>
      <MeetingLinkPopup isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        meetingLink={meetingLink}
        setMeetingLink={setMeetingLink}
      />

      {/* main page */}
      <Box
        bg="background" 
        display="flex"
        flexDirection="column"
        w="100vw"
        flex="1"
      >
        <HStack
          w="100vw" flex="1"
          gap="0"
          spacing={0}
          display="flex"
          flexDirection="row-reverse"
          align="stretch" // This makes children fill height
          color="onSurface"
        >
          <Image
            w="50vw" flex="1" 
            src="/freepik_img.png"
            objectFit="cover"
            display="block" // removes inline-block gap
          />
          <MeetingHero />
        </HStack>
      </Box>
    </Box>
  );
}

export default LandingPage;