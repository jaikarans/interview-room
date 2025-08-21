"use client"

import { Slider, Stack, useSlider } from "@chakra-ui/react"
import { setPenWidth } from "../canvasUtil";

const LineWidthSlider = () => {
  const slider = useSlider({
    defaultValue: [4],
    thumbAlignment: "center",
    min: 1,
    max: 10,
    
  });

  return (
    <Stack align="flex-start">
      <Slider.RootProvider size='sm' value={slider} width="100px"
        onChange={(event) => {
          const penWidth = event.nativeEvent.target.value;
          console.log('slider event', penWidth);
          setPenWidth(penWidth);
        }}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.RootProvider>
    </Stack>
  )
}

export default LineWidthSlider;