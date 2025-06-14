import { Box, HStack, IconButton } from "@chakra-ui/react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MediaPreview = ({roomExist}) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    if (!(roomExist == null) || roomExist === true) {
      getMedia();
    }

    return () => {
      // Cleanup media stream when component unmounts
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [roomExist]);

  const toggleMic = () => {
    setMicOn(prev => !prev);
    streamRef.current?.getAudioTracks().forEach(track => {
      track.enabled = !micOn;
    });
  };

  const toggleVideo = () => {
    setVideoOn(prev => !prev);
    streamRef.current?.getVideoTracks().forEach(track => {
      track.enabled = !videoOn;
    });
  };

  return (
    <Box
      position="relative" 
      className="group"
      bg={"#131314"}
      rounded="xl"
      width="60%"
      height="70%"
      >

      {/* Video Placeholder */}
      {/* <Box rounded={"xl"} overflow={"hidden"}> */}
      <video
        // src="your-stream"
        ref={videoRef}
        autoPlay
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        rounded="xl"
      />
      {/* </Box> */}

      {roomExist === true &&
        <Box
          position="absolute"
          bottom="4"
          left="50%"
          transform="translateX(-50%)"
          zIndex={10}
          display="none"
          _groupHover={{display: 'flex'}} 
        >
          <HStack spacing={4}>
            <IconButton
              rounded={"full"}
              bg={micOn ? "#131314" : "red"}
              aria-label="Toggle Mic"
              onClick={toggleMic}
              size="lg"
              _hover={{
                filter: 'brightness(2)',
                transition: 'all 0.2s',
              }}
            >

              {micOn && <Mic />}
              {!micOn && <MicOff />}

            </IconButton>
            <IconButton
              rounded="full"
              aria-label="Toggle Video"
              onClick={toggleVideo}
              bg={videoOn ? "#131314" : "red"}
              size="lg"
              _hover={{
                filter: 'brightness(2)',
                transition: 'all 0.2s',
              }}
            >
              {videoOn && <Video />}
              {!videoOn && <VideoOff />}
            </IconButton> 
          </HStack>
        </Box>
      }
    </Box>
  );
}

export default MediaPreview;