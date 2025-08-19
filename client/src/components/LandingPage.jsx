"use client"

import { Box, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import MeetingHero from "./MeetingHero";


const LandingPage = () => {

  return (
    <Box
      fontFamily="body"
      bg="background"
      color="on-background"
      w="100vw" h="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Navigation Bar */}
      <Box
        bg="surface-low"
        p="1" 
        borderBottomWidth="1px"
        borderColor={useColorModeValue("border.light", "border.dark")}
      >
        <HStack color="primary" px="12px">
          <Text
            as="h1"
            fontFamily='header'
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
          // flexDirection="row-reverse"
          align="stretch" // This makes children fill height
          alignItems='center'
          color="onSurface"
          flexDirection={{ base: "column", md: "row" }} // stack on mobile
        >
          <MeetingHero />
          <Box
            flex='1'
            flexGrow='1'
            display='flex'
            alignItems='center'
            flexDirection='column'
            w={{ base: "50%", md: "100%" }}
            h="100%"
          >
            <Image
              src="/freepik_img.png"
              objectFit="contain" // preserves aspect ratio without cropping
              w="100%"             // half the width of parent
              h="100%"             // half the height of parent
              display="block"
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default LandingPage;