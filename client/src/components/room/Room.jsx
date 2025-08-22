import { Box, Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import CustomEditor from "./monaco/Editor";
import BoxResizeable from "./resizeable-box/BoxResizeable";
import VideoAudioCard from "../lobby/VideoAudioCard";
import Canvas from "./canvas/Canvas";
import NavBar from "./NavBar";
import SelectLang from "./SelectLang";
import { LuPlay } from "react-icons/lu";
import CanvasToolbar from "./canvas/toolbar/CanvasToolbar";
import JsCodebox from "./JsCodebox";
import { useAppContext } from "../../AppContext";
import { useEffect } from "react";
import { Tooltip } from "../ui/tooltip";
import { useColorModeValue } from "../ui/color-mode";
import { customTheme } from "../ui/theme";

const Room = () => {

  const { triggerCodeRun } = useAppContext();

  // extracting color for tooltip backgound
  const colorPrimaryContainerHighest = customTheme.theme.semanticTokens.colors['surface-container-highest'].value;
  const toolpitBackground = useColorModeValue(colorPrimaryContainerHighest.base, colorPrimaryContainerHighest._dark);
  console.log('tooltip',toolpitBackground)
  const colorOutline = customTheme.theme.semanticTokens.colors['on-surface-variant'].value;
  const tooltipTextColor = useColorModeValue(colorOutline.base, colorOutline._dark);

  // run code with ctrl + Enter 
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + Enter (or Command + Enter on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "'") {
        event.preventDefault(); 
        
        triggerCodeRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // It removes the event listener when the component unmounts.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerCodeRun]); 


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
      <JsCodebox />
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
            <Tooltip 
              content="Ctrl + '"
              contentProps={{ css: { 
                "--tooltip-bg": `${toolpitBackground}`,
                "color": `${tooltipTextColor}`
                }
              }}  
            >
              <Button onClick={triggerCodeRun} borderRadius='xl' bg='primary' color='on-primary' size='sm'>
                <LuPlay/>
              </Button>
            </Tooltip>
          </HStack>
          <CustomEditor/>
        </VStack>
        <VStack bg='surface-container-high' m='2' flex={1} shadow='md' shadowColor='shadow'
          borderRadius='xl'
        >
          <CanvasToolbar pb='2' bg='surface-container-highest' color='on-surface'/>
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