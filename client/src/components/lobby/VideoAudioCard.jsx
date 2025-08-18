import { Button, Card, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuEye, LuEyeClosed, LuMic, LuMicOff, LuVideo, LuVideoOff } from "react-icons/lu";
import { toaster, Toaster } from "../ui/toaster";

const sizes = {
  medium: { w: "1047px", h: "588px" }, // lobby size
  small: { w: "400px", h: "225px" },   // interview size
};

// cardSize = "medium" | "small"
const VideoAudioCard = ({cardSize}) => {

  const [videoOn, setVideoOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);
	
	const audioRef = useRef(null);
	const videoRef = useRef(null);
	const mediaRef = useRef(null); // store MediaStream so we can stop it later

  const toggleVisible = () => {
    setIsCardVisible(!isCardVisible);
  }

  const toggleMic = async () => {
    if (micOn) {
      // Turn off mic
      const audioTrack = mediaRef.current?.getAudioTracks()[0];
      if (audioTrack) {
        mediaRef.current.removeTrack(audioTrack);
        audioTrack.stop();
      }
  
      if (audioRef.current) {
        audioRef.current.srcObject = null;
      }
  
      setMicOn(false);
      return;
    }
  
    // Request audio
    let audioStream;
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.log('err', err);
      toaster.error({
        title: err.message || 'Error',
        description: 'Microphone access is blocked. Please enable permissions in your browser settings and refresh the page.',
      });
      return;
    }
  
    // Initialize mediaRef if not exists
    if (!mediaRef.current) {
      mediaRef.current = new MediaStream(audioStream.getAudioTracks());
    } else {
      // Add new audio tracks to existing stream
      audioStream.getAudioTracks().forEach(track => mediaRef.current?.addTrack(track));
    }
  
    // Bind audio to element
    if (audioRef.current) {
      audioRef.current.srcObject = new MediaStream(mediaRef.current.getAudioTracks());
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Error playing audio element:', err);
      }
    }
  
    setMicOn(true);
  };
  
  const toggleVideo = async () => {
    if (videoOn) {
      // Turn off video
      const videoTrack = mediaRef.current?.getVideoTracks()[0];
      if (videoTrack) {
        mediaRef.current.removeTrack(videoTrack);
        videoTrack.stop();
      }
  
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
  
      setVideoOn(false);
      return;
    }
  
    // Request video
    let videoStream;
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (err) {
      console.log('err', err);
      toaster.error({
        title: err.message || 'Error',
        description: 'Camera access is blocked. Please enable permissions in your browser settings and refresh the page.',
      });
      return;
    }
  
    // Initialize or add to existing MediaStream
    if (!mediaRef.current) {
      mediaRef.current = new MediaStream(videoStream.getVideoTracks());
    } else {
      videoStream.getVideoTracks().forEach(track => mediaRef.current?.addTrack(track));
    }
  
    // Bind to video element
    if (videoRef.current) {
      videoRef.current.srcObject = new MediaStream(mediaRef.current.getVideoTracks());
      try {
        await videoRef.current.play();
      } catch (err) {
        console.log('Error playing video element:', err);
      }
    }
  
    setVideoOn(true);
  };
  

  return(
    <Card.Root
      // w="1047px"
      // h="588px"
      w={sizes[cardSize].w}
      h={sizes[cardSize].h}
      borderRadius='3xl'
      opacity={ isCardVisible ? 1 : '0.2' }
      _hover={{ opacity: isCardVisible ? 1 : 0.4 }}
    
    >
    <Card.Body
      overflow="hidden"
      position="relative"
      borderRadius='3xl'
      bg={isCardVisible ? 'gray.900' : 'surface-bright'}
      p='0'
      objectFit='cover'
      
    >
      <Toaster />
      <audio ref={audioRef} autoPlay />
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: '24px'
        }}
      />

      {/* minimize and maximize buttons */}
      <Button
        position="absolute"
        top="20px"
        right="20px"
        color='outline'
        bg='transparent'
        onClick={toggleVisible}
      >
        {isCardVisible ? <LuEye /> : <LuEyeClosed />}
      </Button>

      {/* video/mic toggle button overlay */}
      <HStack
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        gap={10}
      >
        <Button
          variant={ videoOn ? "circular-secondary-inactive" : "circular-secondary-active" }
          onClick={toggleVideo}
        >
          { videoOn ? <LuVideo /> : <LuVideoOff /> }
        </Button>
        <Button
          variant={ micOn ? "circular-secondary-inactive" : "circular-secondary-active" }
          onClick={toggleMic}
        >
          { micOn ? <LuMic /> : <LuMicOff /> }
        </Button>
      </HStack>
    </Card.Body>
  </Card.Root>
  );

}

export default VideoAudioCard;