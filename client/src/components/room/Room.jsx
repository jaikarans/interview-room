import { Box, Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import CustomEditor from "./monaco/Editor";
import BoxResizeable from "./resizeable-box/BoxResizeable";
import VideoAudioCard from "../lobby/VideoAudioCard";
import Canvas from "./canvas/Canvas";
import NavBar from "./NavBar";
import SelectLang from "./SelectLang";
import { LuPlay } from "react-icons/lu";
import PenColorSelector from "./canvas/PenColorSelector";

const Room = () => {

  return (
    <VStack
      bg='surface-container'
      display='flex'
      w="100vw"
      h="100vh"
      overflow='hidden'
      shadowColor='shadow'
      
    >
      <NavBar />

      <Box
        display='flex'
        w="100vw"
        h="100vh"

      >
        <VStack bg='surface-container-high' m='2' flex={1} shadow='md' shadowColor='shadow'
          borderRadius='xl'
        >
          <HStack w='100%' pb='2' pl='5.2em' color='on-surface'>
            <SelectLang />
            <Spacer />
            <Button borderRadius='xl' bg='primary' color='on-primary' size='sm'>
              <LuPlay/>
            </Button>
          </HStack>
          <CustomEditor/>
        </VStack>
        <VStack bg='surface-container-high' m='2' flex={1} shadow='md' shadowColor='shadow'
          borderRadius='xl'
        >
          <HStack pb='2' color='on-surface'>
            <PenColorSelector />
          </HStack>
          <Canvas />
        </VStack>
        
      </Box>
        {/* videocards with with z index */}
        <BoxResizeable>
          <VideoAudioCard cardSize='small'/>
        </BoxResizeable>
        <BoxResizeable index={1}>
          <VideoAudioCard cardSize='small'/>
        </BoxResizeable>
    </VStack>
  );
}

export default Room;