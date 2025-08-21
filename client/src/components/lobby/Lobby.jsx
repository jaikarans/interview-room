import { Box, Button, HStack, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import VideoAudioCard from "./VideoAudioCard";
import { useState } from "react";
import { customTheme } from "../ui/theme";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";


const Lobby = () => {

	const [isSocketConneted, setIsSocketConneted] = useState(false);

	const outlineVariant = customTheme.theme.semanticTokens.colors['outline-variant'].value;
	const spinnerTrackerColor = useColorModeValue(outlineVariant.base, outlineVariant._dark);


	return (
		<Box
			bg="background"
			color='on-background'
			display='flex'
			alignItems='center'
			justifyContent='center'
			w="100vw"
			h="100vh"
			
		>
			<ColorModeButton
				position='absolute'
				top='2'
				right='2'

			/>
			<HStack
				// bg='blue'
				spaceX='25px'				
			>
				<VideoAudioCard cardSize="medium" isLobby={true}/>
				<Spacer />
				<VStack
					// bg='green'
					spaceY='10px'					
				>
					<Text
						fontSize='3xl'
					>
						{isSocketConneted ? 'Ready to Join' : 'Getting Ready...'}
					</Text>
					{!isSocketConneted && 
						<Spinner 
						borderWidth='4px'
						size='lg'
						animationDuration="1s"
						color="primary"
						css={{ "--spinner-track-color": `${spinnerTrackerColor}` }}
						/>
					}
					<Text
						fontSize={'xl'}
						display={isSocketConneted ? 'block' : 'none'}
					>
						{'no one is in meeting'}
					</Text>
					<Button
						display={isSocketConneted ? 'block' : 'none'}
						variant='filled'
						onClick={() => {
							document.documentElement.requestFullscreen();
						}}
					>
						Join
					</Button>
				</VStack>
			</HStack>
		</Box>
	);
};

export default Lobby;
