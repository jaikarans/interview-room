import { Center, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";

const InvalidRoom = () => {
  
  return (
    <Center width="100vw" height="100vh">
      <ColorModeButton />
      <VStack>
        <Text textStyle="4xl">
          Check your meeting code
        </Text>
        <Spacer />
        <Text color="gray.500" textStyle="lx">
          Make sure that you've entered the correct meeting code in the URL, e.g.
        </Text>
        <HStack>
          <Text>
            <Text as="span" color="gray.500" textStyle="lx">
              https://interview.com/
            </Text>
            <Text as="span" fontWeight="bolder" color="gray.700">xxx-yyyy-zzz</Text>  
          </Text>
        </HStack>
      </VStack>

    </Center>
  );
}

export default InvalidRoom;