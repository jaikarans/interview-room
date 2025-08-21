import { HStack } from "@chakra-ui/react";
import PenColorSelector from "./PenColorSelector";
import LineWidthSlider from "./LineWidthSlider";

const CanvasToolbar = () => {
  return (
    <HStack>
      <PenColorSelector />
      <LineWidthSlider />
    </HStack>
  );
}

export default CanvasToolbar;