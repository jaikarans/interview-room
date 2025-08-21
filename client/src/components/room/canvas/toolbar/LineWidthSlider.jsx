"use client"

import { Slider, Stack, useSlider } from "@chakra-ui/react";
import { setPenWidth } from "../canvasUtil";

const LineWidthSlider = () => {
	const slider = useSlider({
		defaultValue: [4],
		thumbAlignment: "center",
		min: 1,
		max: 15,
	});

	return (
		<Stack align="flex-start">
			<Slider.RootProvider cursor='pointer' size='sm' value={slider} width='75px'
				onChange={(event) => {
					const penWidth = event.nativeEvent.target.value;
					// console.log('slider event', penWidth);
					setPenWidth(penWidth);
				}}
			>
				<Slider.Control>
					<Slider.Track bg="surface-variant">
						<Slider.Range bg="primary" />
					</Slider.Track>
					<Slider.Thumbs bg="primary" borderColor="on-primary" />
				</Slider.Control>
			</Slider.RootProvider>
		</Stack>
	);
};

export default LineWidthSlider;