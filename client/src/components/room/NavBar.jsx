import { HStack, Spacer } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";

const NavBar = () => {
  return (
    <HStack
      position='sticky'
      top={0}
      zIndex='max'
      w='100%'
      h='3em'
      px='3'
      bg='surface-container-highest'
      shadow='sm'
      shadowColor='shadow'
    >
      
      <Spacer />
      <ColorModeButton />
    </HStack>
  );
}

export default NavBar;