"use client"

import { Clipboard, CloseButton, Dialog, Group, HStack, IconButton, Portal, Spacer, Text, useSlotRecipe } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

  const MeetingLinkPopup = ({props, isPopupOpen, setIsPopupOpen, meetingLink, setMeetingLink }) => {

    const copyBtnRef = useRef(null);

    useEffect(() => {
      console.log("isPopupOpen changed:", isPopupOpen);
      if (copyBtnRef.current) {
        copyBtnRef.current.blur();
      }

    }, [isPopupOpen]);

    const ClipboardIconButton = () => {
      return (
        <Clipboard.Trigger asChild borderRadius="full">
          <IconButton bg="surface-container" color="on-surface" _hover={{borderRadius:'full', bg:'surface-container-highest'}}>
            <Clipboard.Indicator />
          </IconButton>
        </Clipboard.Trigger>
      )
    }
    
    const recipe = useSlotRecipe({ key: "popup" });
    const style = recipe();

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
            css={style.root}

          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content css={style.content}>
                  <Dialog.Header css={style.header}>
                    Here's your joining Information
                    <Dialog.CloseTrigger asChild css={style.closeTrigger}>
                      <CloseButton />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>
                  <Dialog.Body css={style.body} >
                    <Text>
                      Send this link to person you want to meet with. Make sure that you save it so that you can use it later, too.
                    </Text>
                    <Clipboard.Root ref={copyBtnRef} value={meetingLink}>
                      <Group flexGrow="1" borderRadius="4px" w="full" bg="surface-container" color="on-surface">
                        <Clipboard.ValueText flexGrow="1" fontWeight="400" fontSize="1rem" gap="0.5rem" pl=".75rem" />
                        <Spacer />
                        <ClipboardIconButton />
                      </Group>
                    </Clipboard.Root>
                    <Spacer />
                    <Spacer />
                  </Dialog.Body>
                  
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    </HStack>

    );
  }

  export default MeetingLinkPopup;