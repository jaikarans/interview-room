import { Box, Button, HStack, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import VideoAudioCard from "./VideoAudioCard";
import { useState } from "react";

const Lobby = () => {

	const [isSocketConneted, setIsSocketConneted] = useState(true);


	return (
		<Box
			bg="surface-dim"
			color='on-surface'
			display='flex'
			alignItems='center'
			justifyContent='center'
			w="100vw"
			h="100vh"
			
		>
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
						// css={{ "--spinner-track-color": "colors." }}
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
					>
						Join
					</Button>
				</VStack>
			</HStack>
		</Box>
	);
};

export default Lobby;
