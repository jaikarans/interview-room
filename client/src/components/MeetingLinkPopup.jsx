  import { Clipboard, CloseButton, Dialog, HStack, IconButton, Portal, Spacer, Text } from "@chakra-ui/react";
  import { useEffect, useRef } from "react";
import { useColorModeValue } from "./ui/color-mode";

  const MeetingLinkPopup = ({ isPopupOpen, setIsPopupOpen, meetingLink, setMeetingLink }) => {

    const copyBtnRef = useRef(null);

    useEffect(() => {
      console.log("isPopupOpen changed:", isPopupOpen);
      if (copyBtnRef.current) {
        copyBtnRef.current.blur();
      }

    }, [isPopupOpen]);

    const bg = useColorModeValue("gray.100", "gray.700"); // light/dark mode aware subtle bg
  
  

    return (
      <HStack wrap="wrap" width={20} gap="4">
          <Dialog.Root
            open={isPopupOpen}
            onOpenChange={(e) => {
              if (typeof e === 'boolean') {
                setIsPopupOpen(e);
              } else if (typeof e === 'object' && 'open' in e) {
                setIsPopupOpen(e.open);
              }
            }}
            key={"center"}
            placement={"center"}
            motionPreset="slide-in-bottom"
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Here's your joining Information</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    Send this to person you want to meet with. Make sure that you save it so that you can use it later, too.
                    <Spacer />
                    <HStack borderRadius={10} padding={2} wrap="wrap" bg={bg} variant={"outline"} fullWidth>
                      <Text fontWeight={"bold"} fontSize={"bg"}>
                        {meetingLink}
                      </Text>
                      <Spacer />
                      <Clipboard.Root ref={copyBtnRef} border={0} value={meetingLink}>
                        <Clipboard.Trigger ref={copyBtnRef} asChild>
                          <IconButton variant="ghost"
                            size="bg"
                            _hover={{ bg: "gray.200" }}
                            _focus={{ boxShadow: "none" }}
                            _active={{ bg: "gray.300" }}
                          >
                            <Clipboard.Indicator />
                          </IconButton>
                        </Clipboard.Trigger>
                      </Clipboard.Root>
                    </HStack>
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm"/>
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    </HStack>

    );
  }

  export default MeetingLinkPopup;